import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handlePost = () => {
    console.log('Postar clicado!');
  };

  const handleGoBack = () => {
    // Se router.back() não funcionar, use replace ou push para rota desejada
    router.replace('/(tabs)'); // ou a rota principal do app

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={handleGoBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novo post</Text>
        </View>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Postar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva sua duvida..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 16,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  postButton: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    backgroundColor: Colors.primary_1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  container: {
    padding: 16,
    margin: 8,
  },
  title: {
    fontSize: 16,
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#E7E7E7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  placeholder: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
