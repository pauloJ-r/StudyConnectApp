import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import HomeTabSwitcher from "@/components/HomeTabSwitcher";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
  
      <View style={styles.container}>

        <AppHeaderBar />
        <SearchBar />
        <HomeTabSwitcher />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.light.background,
  }
});
