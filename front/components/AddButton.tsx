import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from 'expo-router';

export function AddButton() {
  function handlePress() {
    router.replace('/(create)');  // troque para a rota real que você tem
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: Colors.primary_1,
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 32,
    color: '#fff',
  },
});
