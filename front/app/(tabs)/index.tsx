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
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function refreshPosts(): Promise<void> {
    setPosts([]);
    setRefreshing(true);
    setHasMore(true);
    await fetchPosts(0);
    setRefreshing(false);
  }

  async function fetchPosts(offset = 0, limit = 10): Promise<void> {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const fetchedPosts = await listPosts(offset, limit);

      if (Array.isArray(fetchedPosts)) {
        if (fetchedPosts.length < limit) {
          setHasMore(false); // acabou os posts
        }

        fetchedPosts.map(buildPostFromData);

        if (offset === 0) {
          setPosts(fetchedPosts); // primeira carga
        } else {
          setPosts(prev => [...prev, ...fetchedPosts]); // append
        }
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <AppHeaderBar />

        {/* Para usar o componente de searchbar passar parâmetro de callback para 'onSearch' */}
        {/* E para a ação do filtro (abrir modal, etx...) passar callback para 'onFilterPress' */}
        <SearchBar />

        <View style={styles.feedContainer}>

          {/* Posts. */}
          <PostList posts={posts} onEndReached={fetchPosts} isLoading={isLoading} refreshing={refreshing} onRefresh={refreshPosts} />
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
