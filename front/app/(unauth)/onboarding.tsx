import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/Button";
interface SquareProps {
  isLight: boolean;
  selected: boolean;
}

export default function OnboardingScreen() {
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

  const Square: React.FC<SquareProps> = ({ isLight, selected }) => {
    const backgroundColor = selected
      ? isLight
        ? "#000"
        : "#fff"
      : "rgba(0, 0, 0, 0.3)";
    return (
      <View
        style={{
          width: 8,
          height: 8,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const Next = (props: any) => <AppButton label="Próximo" {...props} />;
  const Done = (props: any) => <AppButton label="Concluir" {...props} />;

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/images/logo-complete.png")}
        style={styles.logo}
      />

      <Onboarding
        pages={pages}
        DotComponent={Square}
        NextButtonComponent={Next}
        showSkip={false}
        DoneButtonComponent={Done}
        onDone={() => router.replace("/profile")}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        bottomBarHighlight={false}
        bottomBarHeight={100}
      />

      <TouchableOpacity onPress={() => router.replace("/profile")}>
        <Text style={styles.skipText}>Pular introdução</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    /* paddingHorizontal: 15, */
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
    paddingBottom: 70,
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
    marginBottom: 50,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  buttonWrapper: {
    alignSelf: "center", // ⬅️ centraliza abaixo dos dots
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
