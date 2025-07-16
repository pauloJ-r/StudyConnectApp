import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

import { HeaderProfile } from '../components/HeaderProfile';
import TrophyItem from '../components/TrophyItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddButton } from '@/components/AddButton';
import PostList from "@/components/PostList";
import { mockPosts, mockIndexableStudyGroups } from "../mock/homescreen";
import ResponseItem from "@/components/AnswersItem"; // Import AnswerItem component


const TrophyPage = () => {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
            <HeaderProfile name="Pedro Santiago"
            course="Sistema Para Internet"
            badge="🟣 Colaborador Ativo"
            description="Estudante apaixonado por tecnologia. Sempre disposto a ajudar colegas com dúvidas de programação."
            
            
            
            />

      <Text style={styles.title}>Respostas Relavantes</Text>

        <ResponseItem text = "sua pergunta é bem interessante, vc pode tentar de tal forma"
            countLikes={10} 
        />
       <ResponseItem text = "desse jeito não é o melhor caminho"
                    countLikes={5}
       />
       <ResponseItem text = "assim fica melhor"
                    countLikes={3}
       />
       <ResponseItem text = "fizeram esta mesma pergunta no post anterior talvez lhe ajude"
                    countLikes={2}
       />

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

export default TrophyPage;
