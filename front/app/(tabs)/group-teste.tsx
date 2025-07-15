import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import AppHeaderBar from '@/components/AppHeaderBar';
import GroupList from '@/components/GroupList'; // se for só um flatlist, pode refatorar para renderItem diretamente
import JoinNewStudyGroupBalloon from '@/components/JoinNewStudyGroupBalloon';
import SearchBar from '@/components/SearchBar';
import { Colors } from '@/constants/Colors';
import { mockIndexableStudyGroups } from '../../mock/homescreen';

export default function GroupTesteScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AppHeaderBar />
        <SearchBar />
        <FlatList 
          contentContainerStyle={{ paddingBottom: 100 }}
          data={mockIndexableStudyGroups}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            // Se GroupList renderiza a lista toda, você pode substituir por componente simples que renderiza um grupo:
            // Ou refatore GroupList para aceitar um único grupo e renderizar um item só.
            <GroupList groups={[item]} />
          )}
          ListFooterComponent={<JoinNewStudyGroupBalloon />}
          style={styles.feedContainer}
          // remove scrollIndicator se quiser:
          showsVerticalScrollIndicator={false}
        />
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
    flex: 1,
  },
});
