import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={() => console.log("signed out")} title="Log Out" />
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
