import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constants/Colors";
import { HeaderProfile } from "../components/HeaderProfile";
import TrophyItem from "../components/TrophyItem";
import { AddButton } from "@/components/AddButton";

// Importe suas funções de serviço da API
import { getUserProfile, getUserTrophies } from "../services/profileService";
// Importe os tipos do seu arquivo central
import type { UserProfile } from "../services/profileService";
import type { UserBadge } from "../types/user";
import { AuthContext } from "@/context/authContext";

const TrophyPage = () => {
  const { user } = useContext(AuthContext);
  // 1. Estados para gerenciar os dados, carregamento e erros
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [trophies, setTrophies] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Hook para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id; // ID do usuário

        // Busca o perfil e os troféus em paralelo
        const [profile, userTrophies] = await Promise.all([
          getUserProfile(userId),
          getUserTrophies(userId), // <- Use sua função real aqui!
        ]);

        setProfileData(profile);
        setTrophies(userTrophies);
      } catch (err) {
        console.error("Erro ao buscar dados para a página de troféus:", err);
        setError("Não foi possível carregar os dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 3. Renderização condicional para carregamento e erro
  if (loading) {
    return (
      <ActivityIndicator
        style={styles.centered}
        size="large"
        color={Colors.primary_1}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Garante que o perfil não é nulo antes de renderizar
  if (!profileData) {
    return null;
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
      <Text style={styles.title}>🏅 Troféus conquistados</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={trophies}
        // 1. CORREÇÃO DO KEY EXTRACTOR: Use 'item.tag' como chave única
        keyExtractor={(item) => item.tag}
        // 2. CORREÇÃO DAS PROPS NO RENDERITEM
        renderItem={({ item }) => (
          <TrophyItem
            title={item.tag} // Use item.tag para a prop 'title'
            count={parseInt(item.count)} // Converta a string 'count' para número
            color="#CD7F32" // Forneça uma cor padrão, já que a API não envia
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text>Nenhum troféu conquistado ainda.</Text>
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
    backgroundColor: "#E7E7E7",
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary_1,
    marginVertical: 12,
    textAlign: "center",
  },
});

export default TrophyPage;
