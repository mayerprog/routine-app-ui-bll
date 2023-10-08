import React, { useEffect } from "react";
import Fonts from "../hooks/fonts-hook";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tasks = useSelector((state) => state.task.tasks);

  if (!Fonts()) {
    return <Text>Loading...</Text>; // or a loading screen
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "white", height: 88 },
        tabBarInactiveTintColor: "#33363F",
        tabBarActiveTintColor: "#1B57B8",
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarBadge: tasks.length, // amount of tasks
          tabBarBadgeStyle: { backgroundColor: "#F8C33B", marginTop: 5 },
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
