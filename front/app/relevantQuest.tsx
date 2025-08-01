import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

import { HeaderProfile } from '../components/HeaderProfile';
import TrophyItem from '../components/TrophyItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddButton } from '@/components/AddButton';
import PostList from "@/components/PostList";
import { mockPosts, mockIndexableStudyGroups } from "../mock/homescreen";



const RelevantQuestPage = () => {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
            <HeaderProfile name="Pedro Santiago"
            course="Sistema Para Internet"
            description="Estudante apaixonado por tecnologia. Sempre disposto a ajudar colegas com dúvidas de programação."
            
            
            
            />

      <Text style={styles.title}>Perguntas Relavantes</Text>

        <PostList posts={mockPosts} />
       

    </ScrollView>
      <AddButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#E7E7E7',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary_1,
    marginVertical: 12,
    textAlign: 'center',
  },
});

export default RelevantQuestPage;
