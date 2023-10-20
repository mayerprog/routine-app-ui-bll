import React from "react";
import Fonts from "../hooks/fonts-hook";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import TabNavigator from "./TabNavigator";
import NewTaskScreen from "../screens/NewTaskScreen";
import InTaskScreen from "../screens/InTaskScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  if (!Fonts()) {
    return <Text>Loading...</Text>; // or a loading screen
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="NewTask" component={NewTaskScreen} />
      <Stack.Screen name="InTask" component={InTaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
