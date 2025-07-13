import { SafeAreaView, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center", // centraliza verticalmente
  },
});
