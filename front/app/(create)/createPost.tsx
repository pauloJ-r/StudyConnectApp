import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { createPost } from '@/services/postService';
import { AuthContext } from '@/context/authContext';

export default function CreatePost() {
  const router = useRouter();
  const { user, token } = useContext(AuthContext); // pega user e token do contexto

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = async () => {
    try {
      if (!token || !user) {
        Alert.alert('Erro', 'Você precisa estar logado para postar.');
        return;
      }

      if (!title.trim() || !description.trim()) {
        Alert.alert('Aviso', 'Preencha todos os campos!');
        return;
      }

      await createPost(title, description, [], user.id, token);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  const handleGoBack = () => {
    router.replace('/(tabs)');
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
          placeholder="Escreva sua dúvida..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 16,
  },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontFamily: 'Poppins-SemiBold', marginLeft: 8 },
  postButton: {
    fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff',
    backgroundColor: Colors.primary_1, paddingLeft: 16, paddingRight: 16,
    paddingVertical: 8, borderRadius: 8, marginLeft: 'auto',
  },
  container: { padding: 16, margin: 8 },
  input: {
    backgroundColor: '#E7E7E7', borderRadius: 8, padding: 12, fontSize: 16,
    fontFamily: 'Poppins-Regular', marginBottom: 16,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
});
