import AppHeaderBar from '@/components/AppHeaderBar';
import SearchBar from '@/components/SearchBar';
import { Colors } from '@/constants/Colors';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function GroupTesteScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
         <AppHeaderBar/>
         <SearchBar />
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
