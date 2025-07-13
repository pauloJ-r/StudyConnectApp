import React, { useRef, useState } from "react";
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

  const onboardingRef = useRef<Onboarding>(null);
  const [index, setIndex] = useState(0);

  const handlePress = () => {
    if (index === pages.length - 1) {
      router.replace("/profile");
    } else {
      onboardingRef.current?.goNext();
    }
  };

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

  const Square: React.FC<SquareProps> = ({ selected }) => {
    return (
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 4,
          backgroundColor: selected ? Colors.primary_1 : "#ccc",
          opacity: selected ? 1 : 0.5,
        }}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/images/logo-complete.png")}
        style={styles.logo}
      />

      <Onboarding
        ref={onboardingRef}
        pages={pages}
        DotComponent={Square}
        showNext={false}
        showDone={false}
        showSkip={false}
        bottomBarHeight={80}
        bottomBarHighlight={false}
        pageIndexCallback={setIndex}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
      />

      <AppButton
        label={index === pages.length - 1 ? "Próximo" : "Próximo"}
        onPress={handlePress}
        style={styles.button}
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
    paddingBottom: 100,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    color: Colors.primary_1,
    fontSize: 26,
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
  button: {
    alignSelf: "center",
    marginBottom: 24,
    width: 200,
  },
});
