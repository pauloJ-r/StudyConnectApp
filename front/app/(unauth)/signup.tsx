import { View, StyleSheet, Text } from "react-native";
import Input from "@/components/Input";
import { AppButton } from "@/components/Button";
import { useRouter } from "expo-router";

export default function SignupForm() {
  const router = useRouter();

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Junte-se à comunidade de estudos</Text>

      <Input placeholder="Nome" iconName="person.crop.circle.fill" />
      <Input placeholder="Email" iconName="envelope" />
      <Input placeholder="Curso" iconName="graduationcap" />
      <Input placeholder="Senha" iconName="key" secureTextEntry />
      <Input placeholder="Confirmar Senha" iconName="key" secureTextEntry />
      <AppButton
        style={styles.button}
        label="Criar Conta"
        onPress={() => router.replace("/login")}
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
