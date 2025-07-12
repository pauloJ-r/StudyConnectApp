import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import HomeTabSwitcher from "@/components/HomeTabSwitcher";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet } from "react-native";
import PostList from "@/components/PostList";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <AppHeaderBar/>

        {/* Para usar o componente de searchbar passar parâmetro de callback para 'onSearch' */}
        {/* E para a ação do filtro (abrir modal, etx...) passar callback para 'onFilterPress' */}
        <SearchBar/>

        {/* Componente temporário. */}
        {/* TODO: Transformar em wrapper para tonar tabs flexíveis. */}
        <HomeTabSwitcher/>

        <PostList posts={[]}/>

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
