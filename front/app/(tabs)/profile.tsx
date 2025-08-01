import React from "react";
// 1. Importe o Dimensions
import { View, ScrollView, StyleSheet, Dimensions,SafeAreaView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { FeedEntity } from "@/types/feed_entity_enum";
import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import { HeaderProfile } from "@/components/HeaderProfile";
import { ProfileStats } from "@/components/ProfileStats";
import { TabSwitcher } from "@/components/TabSwitcher";
import { mockPosts, mockIndexableStudyGroups } from "../../mock/homescreen";
import GroupList from "@/components/GroupList";
import PostList from "@/components/PostList";
import JoinNewStudyGroupBalloon from "@/components/JoinNewStudyGroupBalloon";
import { AddButton } from "@/components/AddButton";
import ResponseItem from "@/components/AnswersItem"; // Import AnswerItem component

import { getUserProfile, UserProfile, getRelevantPostByUser, getRelevantComentarioByUser, getUserBadgesCount } from "@/services/profileService";

// --- Início do Cálculo ---

// 2. Defina suas constantes de espaçamento
const PADDING_CONTAINER = 16;
const GAP_ENTRE_ITENS = 16;
const NUM_COLUNAS = 2;

// 3. Calcule a largura disponível
const screenWidth = Dimensions.get('window').width;
const availableWidth = screenWidth - (PADDING_CONTAINER * 2) - (GAP_ENTRE_ITENS * (NUM_COLUNAS - 1));

// 4. Calcule a largura de cada item
const itemWidth = availableWidth / NUM_COLUNAS;

// --- Fim do Cálculo ---

type TabOption = 'perguntas' | 'respostas';

export default function ProfilePage() {

    // States.
    const [activeTab, setActiveTab] = useState<TabOption>('perguntas');
    const [feedEntity, setFeedEntity] = useState(FeedEntity.Post);

    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [relevantPostData, setRelevantPostData] = useState<{ perguntasRelevantes: number }>({ perguntasRelevantes: 0});
    const [relevantComentarioData, setRelevantComentarioData] = useState<{ respostasRelevantes: number }>({ respostasRelevantes: 0});
    const [Badges, setBadges] = useState({totalBadges: 0}); 
    const [loading, setLoading] = useState(true);

    function handleTabChange(tab: TabOption) {
        setActiveTab(tab);
        if(tab === 'perguntas') setFeedEntity(FeedEntity.Post);
        else if(tab === 'respostas') setFeedEntity(FeedEntity.Group);
    }


      useEffect(() => {
    async function fetchProfileData() {
        // Use uma constante para o ID para evitar repetição
        const userId = "68811f436c92232ca34eecb4"; 
        
        try {
            // A primeira chamada ainda é separada, pois as outras dependem do 'id' dela
            // (Assumindo que o ID pode ser diferente do 'userId' inicial)
            const profile = await getUserProfile(userId);
            setProfileData(profile);

            // Agora, execute as outras chamadas em paralelo
            const [
                postsData,
                commentsData,
                badgesData
            ] = await Promise.all([
                getRelevantPostByUser(profile.id),
                getRelevantComentarioByUser(profile.id),
                getUserBadgesCount('68811f436c92232ca34eecb4') // Use o mesmo ID para consistência
            ]);

            // Atualize os states com os resultados
            setRelevantPostData(postsData);
            setRelevantComentarioData(commentsData);
            setBadges(badgesData);

        } catch (error) {
            console.error("Ocorreu um erro ao buscar os dados do perfil:", error);
            // Opcional: Adicionar um state de erro para mostrar uma mensagem na tela
            // setErrorState(true); 
        } finally {
            setLoading(false);
        }
    }

    fetchProfileData();
}, []); // O array de dependências vazio está correto

    if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!profileData) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
            <HeaderProfile 
            name={profileData.name}
            course= {profileData.course}
            description= {profileData.bio}
            picturePath={profileData.picturePath} // Passando picturePath para o HeaderProfile
            
            linkedin={profileData.linkedin} // Passando linkedin para o HeaderProfile
            github={profileData.github} // Passando github para o HeaderProfile
            
            />

            {/* O statsContainer agora só precisa do wrap e do gap */}
            <View style={styles.statsContainer}>
                {/* 5. Aplique a largura calculada a cada item */}
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Perguntas Relevantes" value={relevantPostData.perguntasRelevantes } />
                </View>
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Respostas Relevantes" value={relevantComentarioData.respostasRelevantes} />
                </View>
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Troféus" value={Badges.totalBadges} />
                </View>
                <View style={styles.grupos}>
                    <ProfileStats label="Grupos" value={0} disabled />
                </View>
            </View>

            <View style={styles.switcherContainer}>
                <BaseTabSwitcher > 
                    <TabSwitcherSelector
                        text="Perguntas"
                        isActive={activeTab === 'perguntas'}
                        onTabPress={() => handleTabChange('perguntas')}
                    />
                    <TabSwitcherSelector
                        text="Respostas"
                        isActive={activeTab === 'respostas'}
                        onTabPress={() => handleTabChange('respostas')}
                    />
                </BaseTabSwitcher>

                <View>
                           {activeTab === 'perguntas' && <PostList posts={mockPosts}/>}
                 
                           {/* Grupos. */}
                           {activeTab === 'respostas' && 
                           <View style={{ paddingTop: 10 }}>
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
                           </View>}
                </View>
            </View>

            
        </ScrollView>
        <AddButton />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: PADDING_CONTAINER, // Use a constante aqui
        backgroundColor: '#E7E7E7',
        flex: 1,
    },
    switcherContainer: {
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GAP_ENTRE_ITENS, // Use a constante aqui também
        marginBottom: 24,
        marginTop: 16,
        // justifyContent: 'space-between' não é mais necessário com gap
    },
    grupos: {
        width: itemWidth, 
        
    },
});