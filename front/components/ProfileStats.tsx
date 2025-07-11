import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

type StatProps = {
  label: string;
  value: number;
};

export function ProfileStats({ label, value }: StatProps) {
  const router = useRouter();

  const handlePress = () => {
    if (label.toLowerCase().includes('troféu') || label.toLowerCase().includes('trofeu')) {
      router.push("/trophy");
    } else {
      console.log(`Pressed ${label}`);
    }
  };

  return (
    <View style={styles.statBox}>
      <TouchableOpacity style={styles.statInner} onPress={handlePress}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
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
});
