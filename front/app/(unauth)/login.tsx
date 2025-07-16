import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import { AppButton } from "@/components/Button";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SignupForm from "./signup";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/images/logo-complete.png")}
        style={styles.logo}
      />

      <BaseTabSwitcher>
        <TabSwitcherSelector
          text="Entrar"
          isActive={activeTab === "login"}
          onTabPress={() => setActiveTab("login")}
        />

        <TabSwitcherSelector
          text="Criar Conta"
          isActive={activeTab === "signup"}
          onTabPress={() => setActiveTab("signup")}
        />
      </BaseTabSwitcher>
      {/* Formulário de login inline */}
      {activeTab === "login" ? (
        <View style={styles.form}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Entre para continuar seus estudos</Text>

          <Input placeholder="Email" iconName="envelope" />
          <Input placeholder="Senha" iconName="key" secureTextEntry />

          <AppButton
            style={styles.button}
            label="Entrar"
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      ) : (
        <SignupForm />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
  form: {
    marginTop: 24,
    paddingHorizontal: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#4A3DB7",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});
