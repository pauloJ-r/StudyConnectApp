import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export function HeaderProfile() {
return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Pedro Santiago</Text>
      <Text style={styles.course}>Sistema Para Internet</Text>
      <Text style={styles.badge}>🟣 Colaborador Ativo</Text>
      <Text style={styles.description}>
        Estudante apaixonado por tecnologia. Sempre disposto a ajudar colegas com dúvidas de programação.
      </Text>
      <View style={styles.socialButtons}>
        <Text style={styles.button}>GitHub</Text>
        <Text style={styles.button}>LinkedIn</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  course: {
    color: '#666',
    marginTop: 2,
  },
  badge: {
    marginTop: 4,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#E0D8F9',
    color: '#6A0DAD',
    borderRadius: 12,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    color: '#444',
    paddingHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#6A0DAD',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});