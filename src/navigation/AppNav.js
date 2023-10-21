import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { authAPI } from "../api/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../redux/slices/authSlice";
import { ActivityIndicator } from "react-native";

export default function AppNav() {
  const isAuthSelector = useSelector((state) => state.auth.isAuth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const isAuth = await authAPI.isauth();
        dispatch(setIsAuth(isAuth));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{}} />
      ) : isAuthSelector ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
