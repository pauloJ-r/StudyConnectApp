import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,Linking } from "react-native";
import { Colors } from "@/constants/Colors";

type HeaderProfileProps = {
  name: string;
  course: string;
  badge: string;
  description: string;
};



export function HeaderProfile({name,course,badge,description}: HeaderProfileProps) {
return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.course}>{course}</Text>
      <Text style={styles.badge}>{badge}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.socialButtons}>

        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('github.com')}>
          <Text style={styles.text}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('linkedin.com')}>
          <Text style={styles.text}>LinkedIn</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingBottom: 16,
    paddingTop: 16,
    borderRadius: 8,
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
    color: Colors.primary_1,
    borderRadius: 12,
  },
  description: {

    fontSize: 14,
    marginTop: 8,
    color: '#444',
    width: '85%',
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    backgroundColor: Colors.primary_1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: '40%',
  
  },
  text:{
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  }
});