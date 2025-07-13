import AppHeaderBar from "@/components/AppHeaderBar";
import HomeTabSwitcher from "@/components/HomeTabSwitcher";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

const router = useRouter();
// dentro do componente LoginScreen

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AppHeaderBar />
        {/* Para usar o componente de searchbar passar parâmetro de callback para 'onSearch' */}
        {/* E para a ação do filtro (abrir modal, etx...) passar callback para 'onFilterPress' */}
        <SearchBar />
        {/* Componente temporário. */}
        {/* TODO: Transformar em wrapper para tonar tabs flexíveis. */}
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
  },
});
