import React from "react";
// 1. Importe o Dimensions
import { View, ScrollView, StyleSheet, Dimensions,SafeAreaView } from "react-native";

import { HeaderProfile } from "@/components/HeaderProfile";
import { ProfileStats } from "@/components/ProfileStats";
import { TabSwitcher } from "@/components/TabSwitcher";
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


export default function ProfilePage() {
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
                <View style={{ width: itemWidth }}>
                    <ProfileStats label="Grupos" value={4} />
                </View>
            </View>

            <View style={styles.switcherContainer}>
                <TabSwitcher />
            </View>

            
        </ScrollView>
        <AddButton />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: PADDING_CONTAINER, // Use a constante aqui
        backgroundColor: '#eee',
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
});