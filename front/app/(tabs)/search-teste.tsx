import AppHeaderBar from '@/components/AppHeaderBar';
import { Colors } from '@/constants/Colors';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function SearchTesteScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
         <AppHeaderBar/>
      <Text>TELA DE PESQUISA - Em construção</Text>
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
