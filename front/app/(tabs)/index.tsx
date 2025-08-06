import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import { AddButton } from "@/components/AddButton";
import { Post } from "@/types/post";
import { buildPostFromData, listPosts } from "@/services/postService";

export default function HomeScreen() {
  // States.
  const [posts, setPosts] = useState<Post[]>([]);
  // TODO: Adicionar useEffect para dar fetch a entidade de feed
  useEffect(() => {
    async function fetchPosts(offset: number = 0, limit: number = 10): Promise<void> {
      try {
        const fetchedPosts = await listPosts(offset, limit);

        if(Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
          fetchedPosts.forEach(post => {
            return buildPostFromData(post);
          });

          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.log(error);        
      }
    }

    fetchPosts();
  });

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
          <PostList posts={posts} />
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
