import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PostLikeIcon from '../assets/icons/post-like-icon.svg';

type Props = {
  text: string;
  countLikes?: number;

};

const ResponseItem = ({ text, countLikes }: Props) => {
  return (
    <View style={styles.container}>
  <Text
    style={styles.title}
    numberOfLines={1}
    ellipsizeMode="tail"
  >
    {text}
  </Text>
    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 8 }}>
         <PostLikeIcon width={25} height={25} />
         <Text> {countLikes} </Text>
    </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'column'
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
});

export default ResponseItem;
