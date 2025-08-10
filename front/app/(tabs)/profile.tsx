import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import { HeaderProfile } from "@/components/HeaderProfile";
import { ProfileStats } from "@/components/ProfileStats";
import { AddButton } from "@/components/AddButton";
import ResponseItem from "@/components/AnswersItem";
import PostItem from "@/components/PostItem"; // Importe o PostItem

// Importe suas funções e tipos
import {
  getUserProfile,
  getPostsByUserId,
  getAnswersByUserId,
  getUserBadgesCount,
} from "@/services/profileService";
import type { UserProfile } from "@/services/profileService";
import type { Post, Comment } from "@/types/post";
import { AuthContext } from "@/context/authContext";

// ... seu código de cálculo de dimensões ...
const PADDING_CONTAINER = 16;
const GAP_ENTRE_ITENS = 16;
const NUM_COLUNAS = 2;
const screenWidth = Dimensions.get("window").width;
const availableWidth =
  screenWidth - PADDING_CONTAINER * 2 - GAP_ENTRE_ITENS * (NUM_COLUNAS - 1);
const itemWidth = availableWidth / NUM_COLUNAS;

/*
  Lembre-se de definir 'Post' e 'Answer' no seu arquivo de tipos central
  (ex: src/types/index.ts)

  export interface Post { id: number | string; ...outras props }
  export interface Answer { id: number | string; text: string; countLikes: number; }
*/

type TabOption = "perguntas" | "respostas";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabOption>("perguntas");

  // Estados para os dados
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({
    perguntas: 0,
    respostas: 0,
    trofeus: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [answers, setAnswers] = useState<Comment[]>([]);

  // Estados de controle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = user?.id;
      try {
        // Busca tudo em paralelo para máxima performance
        const [profile, userPosts, userAnswers, badgesData] = await Promise.all(
          [
            getUserProfile(userId),
            getPostsByUserId(userId), // <- Use sua função real aqui!
            getAnswersByUserId(userId), // <- Use sua função real aqui!
            getUserBadgesCount(userId),
          ]
        );

        // Atualiza os states com os resultados
        setProfileData(profile);
        setPosts(userPosts);
        setAnswers(userAnswers);
        // Assume que badgesData tem a contagem de troféus, e as listas têm o 'length' para as contagens
        setStats({
          perguntas: userPosts.length,
          respostas: userAnswers.length,
          trofeus: badgesData.totalBadges,
        });
      } catch (err) {
        console.error("Ocorreu um erro ao buscar os dados do perfil:", err);
        setError("Não foi possível carregar o perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const renderPageHeader = () => (
    <>
      {profileData && (
        <HeaderProfile
          name={profileData.name}
          course={profileData.course}
          description={profileData.bio}
          picturePath={profileData.picturePath}
          linkedin={profileData.linkedin}
          github={profileData.github}
        />
      )}

      <View style={styles.statsContainer}>
        <View style={{ width: itemWidth }}>
          <ProfileStats label="Perguntas" value={stats.perguntas} />
        </View>
        <View style={{ width: itemWidth }}>
          <ProfileStats label="Respostas" value={stats.respostas} />
        </View>
        <View style={{ width: itemWidth }}>
          <ProfileStats label="Troféus" value={stats.trofeus} />
        </View>
        <View style={styles.grupos}>
          <ProfileStats label="Grupos" value={0} disabled />
        </View>
      </View>

      <View style={styles.switcherContainer}>
        <BaseTabSwitcher>
          <TabSwitcherSelector
            text="Perguntas"
            isActive={activeTab === "perguntas"}
            onTabPress={() => setActiveTab("perguntas")}
          />
          <TabSwitcherSelector
            text="Respostas"
            isActive={activeTab === "respostas"}
            onTabPress={() => setActiveTab("respostas")}
          />
        </BaseTabSwitcher>
      </View>
    </>
  );

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {activeTab === "perguntas" && (
        <FlatList
          data={posts}
          // 1. CORREÇÃO DO KEY EXTRACTOR: Use a chave correta "_id"
          keyExtractor={(item) => item._id}
          // 2. CORREÇÃO DAS PROPS NO RENDERITEM: Mapeie os dados da API
          renderItem={({ item }) => <PostItem postData={item} />}
          ListHeaderComponent={renderPageHeader}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>Nenhuma pergunta encontrada.</Text>
            </View>
          }
        />
      )}

      {activeTab === "respostas" && (
        <FlatList
          data={answers}
          renderItem={({ item }) => <ResponseItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderPageHeader}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>Nenhuma resposta encontrada.</Text>
            </View>
          }
        />
      )}

      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E7E7E7" },
  listContent: { padding: PADDING_CONTAINER, paddingBottom: 80 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  switcherContainer: { alignItems: "center", marginBottom: 10 },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP_ENTRE_ITENS,
    marginBottom: 24,
    marginTop: 16,
  },
  grupos: { width: itemWidth },
});
