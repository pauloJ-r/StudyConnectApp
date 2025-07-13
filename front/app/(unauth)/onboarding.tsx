import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from 'expo-router';

export default function OnboardingScreen(){
  const router = useRouter();
  const pages = [
    {
      backgroundColor: "#F7F7F7",
      image: (
        <Image
          source={require("../../assets/images/chat.png")}
          style={styles.image}
        />
      ),
      title: "Tire suas dúvidas",
      subtitle: "Faça perguntas e receba ajuda da comunidade acadêmica",
    },
    {
      backgroundColor: "#F7F7F7",
      image: (
        <Image
          source={require("../../assets/images/group.png")}
          style={styles.image}
        />
      ),
      title: "Aprenda em grupo",
      subtitle: "Conecte-se com colegas, monitores e professores",
    },
    {
      backgroundColor: "#F7F7F7",
      image: (
        <Image
          source={require("../../assets/images/book.png")}
          style={styles.image}
        />
      ),
      title: "Acesso a monitores",
      subtitle: "Tenha suporte especializado quando precisar",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/images/logo-complete.png")}
        style={styles.logo}
      />

      <Onboarding
        pages={pages}
        onSkip={() => router.replace('/profile')}
        onDone={() => router.replace('/profile')}
        showSkip={false}
        showNext={false}
        showDone={false}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
      />

      <TouchableOpacity onPress={() => router.replace('/profile')}>
        <Text style={styles.skipText}>Pular introdução</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 50,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    color: Colors.primary_1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#555",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  skipText: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
});
