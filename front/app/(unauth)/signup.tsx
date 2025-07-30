import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "@/components/Input";
import { AppButton } from "@/components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(""); // se for ignorado no backend, tudo bem
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  /*  const [picture, setPicture] = useState({
    uri: "file:///path/to/photo.jpg",
    name: "photo.jpg",
    type: "image/jpeg",
  }); */
  const [picture, setPicture] = useState<null | {
    uri: string;
    name: string;
    type: string;
  }>(null);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);

    // Só adiciona o picture se existir
    if (picture) {
      formData.append("picture", {
        uri: picture.uri,
        name: picture.name || "profile.jpg",
        type: picture.type || "image/jpeg",
      } as any);
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || "Erro no cadastro");
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Junte-se à comunidade de estudos</Text>

      <Input
        placeholder="Nome"
        iconName="person.crop.circle.fill"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        iconName="envelope"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Curso"
        iconName="graduationcap"
        value={course}
        onChangeText={setCourse}
      />
      <Input
        placeholder="Senha"
        iconName="key"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirmar Senha"
        iconName="key"
        secureTextEntry
        value={confirmpassword}
        onChangeText={setConfirmPassword}
      />

      <AppButton
        style={styles.button}
        label="Criar Conta"
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 24, paddingHorizontal: 14 },
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
