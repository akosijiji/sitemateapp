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
  TextInput,
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

  // For Search Bar
  const [query, setQuery] = useState('');

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

  const renderHeader = () => {
    return (
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        editable
        clearButtonMode="always"
        value={query}
        onChangeText={(queryText: string) => setQuery(queryText)}
        placeholder="Search"
      />
    );
  };

  const filteredData = query // based on text, filter data and use filtered data
    ? newsData.filter(item => {
        const itemData = item.title.toLowerCase();
        const textData = query.toLowerCase();
        return itemData.indexOf(textData) > -1;
      })
    : newsData;

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
            ListHeaderComponent={renderHeader()}
            stickyHeaderIndices={[0]}
            data={filteredData}
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
