import { Colors } from "@/constants/Colors"; // seu sistema de cores
import { Feather as Icon } from '@expo/vector-icons';
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>StudyConnect</Text>

      {/* Tabs Entrar / Criar Conta */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
          <Text style={styles.tabTextActive}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Entre para continuar seus estudos</Text>

      {/* Campo de E-mail */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Icon name="mail" size={20} color="#888" style={styles.icon} />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    padding: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginTop: 20,
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 30,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  tabText: {
    color: "#444",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  subtitle: {
    marginBottom: 20,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 48,
  },
  icon: {
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
