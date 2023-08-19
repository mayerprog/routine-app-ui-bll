import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import Fonts from "../hooks/fonts-hook";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  if (!Fonts()) {
    return <Text>Loading...</Text>; // or a loading screen
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
