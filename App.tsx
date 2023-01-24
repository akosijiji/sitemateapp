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
  Modal,
  TextInput,
  StatusBar,
  useColorScheme,
  View,
  Button,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import axios from 'axios';
import NewsArticle from './components/NewsArticle';
import NetInfo from '@react-native-community/netinfo';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isLoading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isOffline, setOfflineStatus] = useState(false);

  // For Search Bar
  const [query, setQuery] = useState('');

  const API_ENDPOINT =
    'https://newsapi.org/v2/everything?apiKey=e536256b1e4840359594c037bd136bd6';

  const searchNewsTitle = async () => {
    setLoading(true);
    try {
      const newsDataResponse = await axios.get(API_ENDPOINT, {
        params: {q: query},
      });
      setNewsData(newsDataResponse.data.articles);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
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
        onSubmitEditing={() => searchNewsTitle()}
        placeholder="Search news"
      />
    );
  };

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
            data={newsData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
            style={styles.list}
            renderItem={({item, index}: any) => (
              <NewsArticle post={item} key={index} />
            )}
            ListEmptyComponent={
              <Text style={styles.notfound}>No results found</Text>
            }
          />
        </View>
      );
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const NoInternetModal = ({show, onRetry, isRetrying}) => (
    <Modal visible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <Button onPress={onRetry} title={'Try Again'} disabled={isRetrying} />
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NoInternetModal
        show={isOffline}
        onRetry={searchNewsTitle}
        isRetrying={isLoading}
      />
      {displayList()}
    </SafeAreaView>
  );
}

export default App;
