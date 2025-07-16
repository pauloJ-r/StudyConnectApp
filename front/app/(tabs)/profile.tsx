import React from "react";
// 1. Importe o Dimensions
import { View, ScrollView, StyleSheet, Dimensions,SafeAreaView } from "react-native";
import { useState } from "react";
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

    function handleTabChange(tab: TabOption) {
        setActiveTab(tab);
        if(tab === 'perguntas') setFeedEntity(FeedEntity.Post);
        else if(tab === 'respostas') setFeedEntity(FeedEntity.Group);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
            <HeaderProfile name="Pedro Santiago"
            course="Sistema Para Internet"
            badge="🟣 Colaborador Ativo"
            description="Estudante apaixonado por tecnologia. Sempre disposto a ajudar colegas com dúvidas de programação."
            
            
            
            />

            {/* O statsContainer agora só precisa do wrap e do gap */}
            <View style={styles.statsContainer}>
                {/* 5. Aplique a largura calculada a cada item */}
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Perguntas Relevantes" value={12} />
                </View>
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Respostas Relevantes" value={28} />
                </View>
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Troféus" value={36} />
                </View>
                <View style={styles.grupos}>
                    <ProfileStats label="Grupos" value={4} disabled />
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
                           <View>
                             <GroupList groups={mockIndexableStudyGroups} />
                             <JoinNewStudyGroupBalloon/>
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