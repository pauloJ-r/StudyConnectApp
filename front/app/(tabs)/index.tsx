import AppHeaderBar from "@/components/AppHeaderBar";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { FeedEntity } from "@/types/feed_entity_enum";
import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import PostList from "@/components/PostList";

type TabOption = 'posts' | 'groups';

export default function HomeScreen() {
  // States.
  const [activeTab, setActiveTab] = useState<TabOption>('posts');
  const [feedEntity, setFeedEntity] = useState(FeedEntity.Post);

  function handleTabChange(tab: TabOption) {
    setActiveTab(tab);
    if(tab === 'posts') setFeedEntity(FeedEntity.Post);
    else if(tab === 'groups') setFeedEntity(FeedEntity.Group);
  }

  // TODO: Adicionar useEffect para dar fetch a entidade de feed

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <AppHeaderBar/>

        {/* Para usar o componente de searchbar passar parâmetro de callback para 'onSearch' */}
        {/* E para a ação do filtro (abrir modal, etx...) passar callback para 'onFilterPress' */}
        <SearchBar/>

        {/* Componente temporário. */}
        {/* TODO: Transformar em wrapper para tonar tabs flexíveis. */}
        {/* <HomeTabSwitcher/> */}
        <BaseTabSwitcher>

          <TabSwitcherSelector
          text="Feed Geral"
          isActive={activeTab === 'posts'}
          onTabPress={() => handleTabChange('posts')}
          />

          <TabSwitcherSelector
          text="Meus Grupos"
          isActive={activeTab === 'groups'}
          onTabPress={() => handleTabChange('groups')}
          />

        </BaseTabSwitcher>

        <View style={styles.feedContainer}>
          {activeTab === 'posts' && <PostList posts={[]}/>}
          {activeTab === 'groups' && <View><Text>Tab de grupos</Text></View>}
        </View>

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
  }
});
