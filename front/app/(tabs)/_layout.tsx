import { Tabs } from "expo-router";
import React from "react";
import { Platform, StatusBar } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol"; 

export default function TabLayout() {
  return (
    <>
        <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.light.background}
          />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary_1,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {
              position: "absolute",
              borderTopWidth: 0,
              shadowColor: "transparent",
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="house.fill" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="group-teste"
          options={{
            title: "Grupos",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="person.3.fill" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search-teste"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="magnifyingglass" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="person.crop.circle.fill" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
