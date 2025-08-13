import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    FlatList,
    TouchableOpacity, // -> NOVO: Para o botão de logout
    Alert,             // -> NOVO: Para o alerta de confirmação
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import { HeaderProfile } from "@/components/HeaderProfile";
import { ProfileStats } from "@/components/ProfileStats";
import { AddButton } from "@/components/AddButton";
import ResponseItem from "@/components/AnswersItem";
import PostItem from "@/components/PostItem";

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
const availableWidth = screenWidth - PADDING_CONTAINER * 2 - GAP_ENTRE_ITENS * (NUM_COLUNAS - 1);
const itemWidth = availableWidth / NUM_COLUNAS;

type TabOption = "perguntas" | "respostas";

export default function ProfilePage() {
    // -> MODIFICADO: Pegamos a função 'logout' do contexto
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<TabOption>("perguntas");

    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState({ perguntas: 0, respostas: 0, trofeus: 0 });
    const [posts, setPosts] = useState<Post[]>([]);
    const [answers, setAnswers] = useState<Comment[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // ... sua função fetchProfileData continua a mesma ...
        const fetchProfileData = async () => {
            if (!user?.id) return; // Garante que temos um ID de usuário
            try {
                const [profile, userPosts, userAnswers, badgesData] = await Promise.all([
                    getUserProfile(user.id),
                    getPostsByUserId(user.id),
                    getAnswersByUserId(user.id),
                    getUserBadgesCount(user.id),
                ]);
                setProfileData(profile);
                setPosts(userPosts);
                setAnswers(userAnswers);
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
    }, [user]); // Adicionamos 'user' como dependência para recarregar se o usuário mudar

    // -> NOVO: Função para lidar com o logout
    const handleLogout = () => {
        Alert.alert(
            "Sair da Conta",
            "Você tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sim, Sair",
                    onPress: () => logout(), // Chama a função do AuthContext
                    style: "destructive",
                },
            ]
        );
    };

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

            {/* -> NOVO: Botão de Logout adicionado abaixo das estatísticas */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>

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
        return <View style={styles.centered}><Text>{error}</Text></View>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* ... suas FlatLists para perguntas e respostas ... */}
            {activeTab === "perguntas" && (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <PostItem postData={item} />}
                    ListHeaderComponent={renderPageHeader}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<View style={styles.centered}><Text>Nenhuma pergunta encontrada.</Text></View>}
                />
            )}

            {activeTab === "respostas" && (
                <FlatList
                    data={answers}
                    renderItem={({ item }) => <ResponseItem {...item} />}
                    keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                    ListHeaderComponent={renderPageHeader}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<View style={styles.centered}><Text>Nenhuma resposta encontrada.</Text></View>}
                />
            )}
            <AddButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#E7E7E7" },
    listContent: { padding: PADDING_CONTAINER, paddingBottom: 80 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    switcherContainer: { alignItems: "center", marginBottom: 10, marginTop: 24 }, // Adicionado marginTop
    statsContainer: { flexDirection: "row", flexWrap: "wrap", gap: GAP_ENTRE_ITENS, marginBottom: 24, marginTop: 16 },
    grupos: { width: itemWidth },
    
    // -> NOVO: Estilos para o botão de logout
    logoutButton: {
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB', // Um cinza claro
        backgroundColor: '#FFF',
    },
    logoutButtonText: {
        textAlign: 'center',
        color: '#EF4444', // Um tom de vermelho para indicar a ação
        fontWeight: '500',
        fontSize: 16,
    }
});
