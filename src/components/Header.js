import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { authAPI } from "../api/usersAPI";
import { setIsAuth } from "../redux/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const dispatch = useDispatch();
  async function logout() {
    const logoutResult = await authAPI.logout();
    dispatch(setIsAuth(logoutResult));
  }

  return (
    <View style={styles.container}>
      <Text>Header</Text>
      <Button onPress={logout} title="Log Out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    top: 20,
    bottom: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    paddingBottom: 50,
    marginBottom: 25,
  },
  text: {
    alignSelf: "center",
  },
});

export default Header;
