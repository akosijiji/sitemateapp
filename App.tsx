/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import axios from 'axios';
import NewsArticle from './components/NewsArticle';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isLoading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);

  const API_ENDPOINT =
    'https://newsapi.org/v2/everything?q=tesla&from=2022-12-24&sortBy=publishedAt&apiKey=183daca270264bad86fc5b72972fb82a';

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsData = await axios.get(API_ENDPOINT);
      setNewsData(newsData.data.articles);
      // console.log(newsData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const displayList = () => {
    if (isLoading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={newsData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
            style={styles.list}
            renderItem={({item, index}: any) => (
              <NewsArticle post={item} key={index} />
            )}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {displayList()}
    </SafeAreaView>
  );
}

export default App;
