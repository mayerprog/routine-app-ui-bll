import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.line}>
        <View style={styles.linesStyle} />
      </View>

      <View style={styles.tasks}>
        <TouchableOpacity
          onPress={() => console.log("add new task")}
          style={styles.iconStyle}
        >
          <Ionicons
            name="ios-add-circle-sharp"
            size={65}
            color="#1B57B8"
            style={styles.iconShadow}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  line: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingTop: 15,
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  tasks: {
    flex: 1,
    flexBasis: "90%",
    flexDirection: "column",
    backgroundColor: "#7BADFF",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 24,
    elevation: 2,
  },
  iconStyle: {
    alignItems: "center",
    position: "relative",
    top: 540,
  },
  iconShadow: {
    elevation: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
});

export default HomeScreen;
