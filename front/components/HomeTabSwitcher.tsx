import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function HomeTabSwitcher() {
  return (
 <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeText}>Feed Geral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveText}>Meus Grupos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    padding: 6,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  activeTab: {
    backgroundColor: Colors.primary_1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  inactiveTab: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    textAlign: 'center',
    alignItems: 'center',
    width: '50%',
  },
  activeText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  inactiveText: {
    color: '#444',
    fontWeight: '500',
    fontSize: 16,
  }
});
