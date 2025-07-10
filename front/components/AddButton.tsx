import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export function AddButton() {
  return (
 <View style={styles.container}>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,

  },
  
  addButton: {
    backgroundColor: Colors.primary_1,
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  plus: {
    fontSize: 32,
    color: '#fff',
  },
});
