import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons"; // -> NOVO: Importando a biblioteca de ícones
import { useRouter } from "expo-router"; // -> NOVO: Importando o hook de navegação

type HeaderProfileProps = {
  name: string;
  course: string;
  description: string;
  picturePath?: string;
  linkedin?: string;
  github?: string;
};

export function HeaderProfile({
  name,
  course,
  description,
  picturePath,
  linkedin,
  github,
}: HeaderProfileProps) {
  const router = useRouter(); // -> NOVO: Inicializando o hook de navegação

  const handleNavigateToEdit = () => {
    // -> NOVO: Função que navega para a tela de edição
    router.push("/editProfile");
  };

  return (
    <View style={styles.container}>
      {/* -> NOVO: Ícone de edição posicionado no canto superior direito */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleNavigateToEdit}
      >
        <Feather name="edit" size={24} color={Colors.primary_1} />
      </TouchableOpacity>

      <Image
        source={
          picturePath
            ? { uri: picturePath }
            : require("@/assets/images/avatar-web.png")
        } // Adicionei uma imagem padrão
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.course}>{course}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(github || "https://github.com")}
        >
          <Text style={styles.text}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(linkedin || "https://linkedin.com")}
        >
          <Text style={styles.text}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    paddingBottom: 16,
    paddingTop: 16,
    borderRadius: 8,
    position: "relative", // -> NOVO: Necessário para o posicionamento absoluto do filho
  },
  editButton: {
    // -> NOVO: Estilo para o botão de edição
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1, // Garante que o botão fique por cima de outros elementos
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  course: {
    color: "#666",
    marginTop: 2,
  },
  badge: {
    marginTop: 4,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#E0D8F9",
    color: Colors.primary_1,
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: "#444",
    width: "85%",
    textAlign: "center", // Adicionado para melhor alinhamento
  },
  socialButtons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary_1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: "40%",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
