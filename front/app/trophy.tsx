import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

import { HeaderProfile } from '../components/HeaderProfile';
import TrophyItem from '../components/TrophyItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddButton } from '@/components/AddButton';

const trophies = [
  { title: 'Javascript', count: 36, color: '#FFD700' }, // ouro
  { title: 'Typescript', count: 23, color: '#C0C0C0' }, // prata
  { title: 'PHP', count: 12, color: '#CD7F32' },        // bronze
  { title: 'Empreendedorismo', count: 7, color: '#87CEEB' } // azul claro
];

const TrophyPage = () => {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
            <HeaderProfile name="Pedro Santiago"
            course="Sistema Para Internet"
            badge="🟣 Colaborador Ativo"
            description="Estudante apaixonado por tecnologia. Sempre disposto a ajudar colegas com dúvidas de programação."
            
            
            
            />

      <Text style={styles.title}>🏅 Troféus conquistados</Text>

      {trophies.map((trophy, index) => (
        <TrophyItem
          key={index}
          title={trophy.title}
          count={trophy.count}
          color={trophy.color}
        />
      ))}
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
