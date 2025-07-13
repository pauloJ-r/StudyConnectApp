import AppHeaderBar from "@/components/AppHeaderBar";
import HomeTabSwitcher from "@/components/HomeTabSwitcher";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
              <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />

        <AppHeaderBar/>
        <SearchBar/>
        <HomeTabSwitcher/>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
