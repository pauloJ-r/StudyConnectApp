import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import SearchIcon from "@/assets/icons/search-icon.svg";
import GroupsIcon from "@/assets/icons/groups-icon.svg";
import UserIcon from "@/assets/icons/user-icon.svg";
import HomeIcon from "@/assets/icons/home-icon.svg";

export default function TabLayout() {
  return (
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
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <HomeIcon width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="group-teste"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color }) => <GroupsIcon width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="search-teste"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ color }) => (
            <SearchIcon width={28} height={28} />
            //<SearchIcon width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <UserIcon width={28} height={28} />,
        }}
      />
    </Tabs>
  );
}
