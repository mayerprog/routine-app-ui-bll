import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import { ActivityIndicator, Text } from "react-native";
import RegisterScreen from "../screens/RegisterScreen";
import Fonts from "../hooks/fonts-hook";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  if (!Fonts()) {
    return <ActivityIndicator size="large" color="#0000ff" style={{}} />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
