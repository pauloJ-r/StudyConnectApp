import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/Colors';
import { HeaderProfile } from '../components/HeaderProfile';
import ResponseItem from "@/components/AnswersItem";
import { AddButton } from '@/components/AddButton';
import { getUserProfile, getRelevantAnswersByUser } from '../services/profileService'; 

// 1. DEFINIÇÃO DOS TIPOS (ajuste as propriedades conforme sua API)
interface UserProfile {
  id: string;
  name: string;
  course: string;
  bio: string;
  picturePath: string;
}

interface Answer {
  id: string;
  text: string;
  likes: number;
}

const RelevantAnswersPage = () => {
  // 2. TIPANDO OS STATES
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "68811f436c92232ca34eecb4";

        const [profile, relevantAnswers] = await Promise.all([
          getUserProfile(userId),
          getRelevantAnswersByUser(userId)
        ]);

        setProfileData(profile);
        setAnswers(relevantAnswers);
      } catch (err) {
        console.error("Erro ao buscar dados da página de respostas:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" color={Colors.primary_1} />;
  }

  if (error) {
    return <View style={styles.centered}><Text>{error}</Text></View>;
  }

  // 3. VERIFICAÇÃO DE NULO (corrige o erro 'possibly null')
  if (!profileData) {
    return null; // Ou um componente de "Perfil não encontrado"
  }

  const renderListHeader = () => (
    <>
      <HeaderProfile
        name={profileData.name}
        course={profileData.course}
        description={profileData.bio}
        picturePath={profileData.picturePath}
      />
      <Text style={styles.title}>Respostas Relevantes</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={answers}
        renderItem={({ item }) => (
          <ResponseItem
            text={item.text}
            countLikes={item.likes}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => (
            <View style={styles.centered}>
                <Text>Nenhuma resposta relevante encontrada.</Text>
            </View>
        )}
      />
      <AddButton />
    </SafeAreaView>
  );
};

// ...seus estilos...
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary_1,
    marginVertical: 12,
    textAlign: 'center',
  },
});

export default RelevantAnswersPage;