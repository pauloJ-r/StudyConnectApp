import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type StatProps = {
  label: string;
  value: number;
};


export function ProfileStats({label, value}: StatProps) {
  return (
      <View style={styles.statBox}>
    <View style={styles.statInner}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({

  statBox: {
    width: '50%',

  },
  statInner: {
    backgroundColor: '#F6F6F6',
    
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 120,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary_1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
