import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import HomeTabSwitcher from "@/components/HomeTabSwitcher";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet } from "react-native";
import PostList from "@/components/PostList";
import { useState } from "react";
import { FeedEntity } from "@/types/feed_entity_enum";

export default function HomeScreen() {
  // States.
  const [feedEntity, setFeedEntity] = useState(FeedEntity.Post);
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);

  // Componentes de listas.
  const feedList = () => {
    if(feedEntity == FeedEntity.Post) {
        return (<PostList posts={posts}/>) ;
    } else if(feedEntity == FeedEntity.Group) {
      return (<View></View>); // TODO: Substituir por listagem de 
    }
  };

  // TODO: Adicionar useEffect para dar fetch na entidade de feed.

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

        {feedList()}

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
