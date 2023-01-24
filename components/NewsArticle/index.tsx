import moment from 'moment';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

type Post = {
  title: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
  author: string;
};

const NewsArticle: React.FC<{
  post: Post;
}> = ({post}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <Image
        blurRadius={1}
        source={{
          uri: post?.urlToImage ?? 'https://picsum.photos/640/360',
          cache: 'force-cache',
        }}
        resizeMode={'cover'}
        style={styles.image}
      />
      <View colors={['#0000', '#000A', '#000']} style={styles.titleContainer}>
        <Text style={styles.text} ellipsizeMode={'tail'} numberOfLines={1}>
          {post?.title}
        </Text>
        <Text style={styles.timestamp}>
          {moment(post?.publishedAt).format('HH:MM DD, MMMM')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsArticle;
