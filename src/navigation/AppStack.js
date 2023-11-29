import React, { useRef } from "react";
import Fonts from "../hooks/fonts-hook";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Text } from "react-native";
import TabNavigator from "./TabNavigator";
import NewTaskScreen from "../screens/NewTaskScreen";
import InTaskScreen from "../screens/InTaskScreen";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Constants from "expo-constants";
import { authAPI } from "../api/usersAPI";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AppStack = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function handleNotificationPermissions() {
      console.log("handle permissions fired");
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const deviceToken = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
      try {
        await authAPI.updateToken(deviceToken);
      } catch (err) {
        console.log(err);
      }
    }

    handleNotificationPermissions().catch((error) => {
      alert(error);
    });
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received!");
        // console.log(notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Clicked!");
        // console.log(response.notification.request.content);
      });
    return () => {
      // unsubscribe when component unmounts
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

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
