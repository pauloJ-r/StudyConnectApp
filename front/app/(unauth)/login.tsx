import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/images/logo-complete.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
});
