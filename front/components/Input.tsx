import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

// -> 1. A interface de props agora estende TextInputProps
// Isso permite que o componente aceite todas as props de um TextInput padrão.
type InputProps = TextInputProps & {
  // A prop 'iconName' é a única que definimos como obrigatória e customizada.
  // Usamos um tipo genérico para pegar o tipo correto do nome do ícone.
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
};

// -> 2. A função agora usa o "rest operator" (...)
// Ele pega a 'iconName' e agrupa todas as outras props (value, placeholder, keyboardType, etc.) em 'rest'.
export default function Input({ iconName, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        // -> 3. Todas as props em 'rest' são passadas diretamente para o TextInput
        {...rest}
      />
      <View style={styles.icon}>
        <IconSymbol name={iconName} size={20} color="#999" />
      </View>
    </View>
  );
}

// Os seus estilos originais foram mantidos
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 44, // Espaço para o ícone
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 16,
    // Centraliza o ícone verticalmente no input
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
