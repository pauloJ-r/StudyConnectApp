import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Onboarding, { Page } from 'react-native-onboarding-swiper';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from "@/constants/Colors";

type RootStackParamList = {
  Home: undefined;
};

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {

  const pages: Page[] = [
    {
      backgroundColor: '#F7F7F7',
      image: <Image source={require('../../assets/images/chat.png')} style={styles.image} />,
      title: <Text style={styles.title}>Tire suas dúvidas</Text>,
      subtitle: <Text style={styles.subtitle}>Faça perguntas e receba ajuda da comunidade acadêmica</Text>,
    },
    {
      backgroundColor: '#F7F7F7',
      image: <Image source={require('../../assets/images/group.png')} style={styles.image} />,
      title: <Text style={styles.title}>Aprenda em grupo</Text>,
      subtitle: <Text style={styles.subtitle}>Conecte-se com colegas, monitores e professores</Text>,
    },
    {
      backgroundColor: '#F7F7F7',
      image:  <Image source={require('../../assets/images/book.png')} style={styles.image} />,
      title: <Text style={styles.title}>Acesso a monitores</Text>,
      subtitle: <Text style={styles.subtitle}>Tenha suporte especializado quando precisar</Text>,
    },
  ];
  
  return (
    <View style={styles.wrapper}>
    <Image
      source={require("../../assets/images/logo-complete.png")}
      style={styles.logo}
    />

    <Onboarding
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      pages={pages}
      containerStyles={styles.container}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,       // espaço em cima pro logo
    //backgroundColor: 'red',
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',    // centraliza horizontalmente    // espaço abaixo da logo
  },
  container: {
    flex: 1,
    justifyContent: "center",
    gap:50,
    //backgroundColor: 'pink',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    color: Colors.primary_1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  
});
