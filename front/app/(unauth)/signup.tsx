import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "@/components/Input";
import { AppButton } from "@/components/Button";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

export default function SignupForm() {
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [picture] = useState(null);

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
        confirmpassword,
        course,
        picture,
      });
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
