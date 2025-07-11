import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  title: string;
  count: number;
  color: string;
};

const TrophyItem = ({ title, count, color }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.count, { color }]}>{count}</Text>
      <MaterialIcons name="emoji-events" size={24} color={color} style={styles.icon} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },
  icon: {
    margin: 8
  },
});

export default TrophyItem;
