import React from "react";
import Fonts from "../hooks/fonts-hook";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Text } from "react-native";
import TabNavigator from "./TabNavigator";
import NewTaskScreen from "../screens/NewTaskScreen";
import InTaskScreen from "../screens/InTaskScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const isAuthSelector = useSelector((state) => state.auth.isAuth);

  if (!Fonts()) {
    return <ActivityIndicator size="large" color="#0000ff" style={{}} />;
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="NewTask" component={NewTaskScreen} />
      <Stack.Screen name="InTask" component={InTaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
