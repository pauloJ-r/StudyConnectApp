import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useState } from "react";
import PostList from "@/components/PostList";
import { mockPosts } from "../../mock/homescreen";
import { AddButton } from "@/components/AddButton";

export default function HomeScreen() {
  // States.

  // TODO: Adicionar useEffect para dar fetch a entidade de feed

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <AppHeaderBar />

        {/* Para usar o componente de searchbar passar parâmetro de callback para 'onSearch' */}
        {/* E para a ação do filtro (abrir modal, etx...) passar callback para 'onFilterPress' */}
        <SearchBar />

        <View style={styles.feedContainer}>

          {/* TODO: Adicionar state de posts e groups. */}

          {/* Posts. */}
          <PostList posts={mockPosts} />
        </View>

        <AddButton />

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
  feedContainer: {
    marginTop: 20,
    flex: 1,
  },
});
