import { View, TextInput, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface InputProps {
  placeholder: string;
  iconName: any;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function Input({
  placeholder,
  iconName,
  secureTextEntry,
  value,
  onChangeText,
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.icon}>
        <IconSymbol name={iconName} size={20} color="#999" />
      </View>
    </View>
  );
}

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
    paddingRight: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 16,
    top: 14,
  },
});
