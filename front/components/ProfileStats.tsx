import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

type StatProps = {
  label: string;
  value: number;
  disabled?: boolean; // 👈 nova propriedade
};

export function ProfileStats({ label, value, disabled = false }: StatProps) {
  const router = useRouter();

  const handlePress = () => {
    if (!disabled) {
      if (label.toLowerCase().includes("troféu") || label.toLowerCase().includes("trofeu")) {
        router.push("/trophy");
      } else  if (label.toLowerCase().includes("pergunta")) {
        router.push("/relevantQuest");
      } else if (label.toLowerCase().includes("resposta")) {
        router.push("/relevantAnswers");
      }
    }
  };

  return (
    <View style={styles.statBox}>
      <TouchableOpacity
        style={[styles.statInner, disabled && styles.statInnerDisabled]}
        onPress={handlePress}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={[styles.statValue, disabled && styles.disabledText]}>{value}</Text>
        <Text style={[styles.statLabel, disabled && styles.disabledText]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statBox: {
    width: "50%",
  },
  statInner: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 120,
  },
  statInnerDisabled: {
    opacity: 0.5, // 👈 aparência desativada
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary_1,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  disabledText: {
    color: "#999", // 👈 tonalidade cinza mais clara
  },
});