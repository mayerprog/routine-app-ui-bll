import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { authAPI } from "../api/usersAPI";
import { setIsAuth } from "../redux/slices/authSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  async function logout() {
    const logoutResult = await authAPI.logout();
    dispatch(setIsAuth(logoutResult));
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/calendar.png")}
          style={styles.calendar}
        />

        <View style={{ flexDirection: "row", marginTop: -9 }}>
          <Image
            style={styles.doneImg}
            source={require("../assets/images/done.png")}
          />
          <Text style={styles.headerText}>
            My
            {"\n"}
            Routine
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={logout} style={{ marginTop: -5 }}>
            <Image
              source={require("../assets/images/logout.png")}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 10,
              marginTop: -3,
            }}
          >
            Log Out
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  headerText: {
    fontSize: 22,
    color: "#1B57B8",
    alignSelf: "center",
    fontFamily: "Lexend-Regular",
  },
  doneImg: {
    height: 38,
    width: 38,
    marginEnd: 10,
    marginVertical: 10,
  },
  calendar: {
    marginStart: 10,
    height: 35,
    width: 35,
  },
});

export default HomeScreen;
