import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export function AddButton() {
  const bottomOffset = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        Animated.timing(bottomOffset, {
          toValue: e.endCoordinates.height + 20,
          duration: 250,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }).start();
      }
    );

    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(bottomOffset, {
          toValue: 80,
          duration: 250,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }).start();
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [bottomOffset]);

  function handlePress() {
    router.replace("/(create)");
  }

  return (
    <Animated.View style={[styles.container, { bottom: bottomOffset }]}>
      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: Colors.primary_1,
    width: 70,
    height: 70,
    bottom: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  plus: {
    fontSize: 32,
    color: "#fff",
  },
});
