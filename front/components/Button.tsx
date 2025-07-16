import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface AppButtonProps extends TouchableOpacityProps {
  label: string;
}

export function AppButton({ label, style, ...rest }: AppButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary_1,
    paddingVertical: 10,
    paddingHorizontal: 28,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
