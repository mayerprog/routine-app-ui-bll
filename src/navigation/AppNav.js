import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { authAPI } from "../api/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../redux/slices/authSlice";

export default function AppNav() {
  const isAuthSelector = useSelector((state) => state.auth.isAuth);
  console.log(isAuthSelector);
  const dipatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isAuth = await authAPI.isauth();
      dipatch(setIsAuth(isAuth));
      console.log("isAuth", isAuth);
    })();
  }, []);

  return (
    <NavigationContainer>
      {isAuthSelector ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
