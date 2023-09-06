import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authAPI } from "../api/usersAPI";
import { setIsAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dipatch = useDispatch();

  async function logout() {
    const logoutResult = await authAPI.logout();

    dipatch(setIsAuth(logoutResult));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={logout} title="Log Out" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
