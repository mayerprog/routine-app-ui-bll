import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function AppNav() {
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
