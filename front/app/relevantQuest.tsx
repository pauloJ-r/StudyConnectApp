import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/Colors';
import { HeaderProfile } from '../components/HeaderProfile';
import { AddButton } from '@/components/AddButton';
import PostItem from '@/components/PostItem'; // Assumindo um componente para renderizar cada post

// Funções do seu serviço de API
import { getUserProfile, getRelevantPostsByUser } from '../services/profileService';
// Importe os tipos do seu arquivo central
import type { Post } from '../types/post';
import type { UserProfile } from '../services/profileService';

const RelevantQuestPage = () => {
  // 1. Estados para gerenciar os dados, carregamento e erros
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Hook para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "68811f436c92232ca34eecb4"; // O ID do usuário pode vir de outro lugar

        // Busca os dados do perfil e os posts em paralelo para melhor performance
        const [profile, relevantPosts] = await Promise.all([
          getUserProfile(userId),
          getRelevantPostsByUser(userId)
        ]);

        setProfileData(profile);
        setPosts(relevantPosts);
      } catch (err) {
        console.error("Erro ao buscar dados para a página de perguntas:", err);
        setError("Não foi possível carregar os dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio garante que isso rode apenas uma vez

  // 3. Renderização condicional para os estados de carregamento e erro
  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" color={Colors.primary_1} />;
  }

  if (error) {
    return <View style={styles.centered}><Text>{error}</Text></View>;
  }

  // Garante que o perfil foi carregado antes de tentar renderizar o cabeçalho
  if (!profileData) {
    return null; // Ou um componente de fallback
  }

  // 4. Componente para renderizar o cabeçalho da lista
  const renderListHeader = () => (
    <>
      <HeaderProfile
        name={profileData.name}
        course={profileData.course}
        description={profileData.bio}
        picturePath={profileData.picturePath}
      />
      <Text style={styles.title}>Perguntas Relevantes</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 5. Usando FlatList para performance e para evitar erros de aninhamento */}
      <FlatList
        data={posts}
        // Com base no nosso último debug, seu PostItem espera a prop 'postData'
        renderItem={({ item }) => <PostItem postData={item} />} 
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text>Nenhuma pergunta relevante encontrada.</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      <AddButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    textAlign: 'center',
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