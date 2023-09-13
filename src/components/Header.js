import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { authAPI } from "../api/usersAPI";
import { setIsAuth } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  async function logout() {
    const logoutResult = await authAPI.logout();
    dispatch(setIsAuth(logoutResult));
  }

  const date = new Date();

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: -11 }}>
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
          <TouchableOpacity onPress={logout} style={{ marginTop: -6 }}>
            <Image
              source={require("../assets/images/logout.png")}
              style={{ height: 38, width: 38 }}
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

      <View style={styles.line}>
        <View style={styles.linesStyle} />
      </View>

      <TouchableOpacity
        onPress={() => console.log("calendar clicked")}
        style={{ flexDirection: "row", justifyContent: "center" }}
      >
        <Image
          source={require("../assets/images/calendar.png")}
          style={{ height: 25, width: 25, marginTop: 17, marginRight: 15 }}
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: 15,
    color: "#1B57B8",
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
  },
  doneImg: {
    height: 38,
    width: 38,
    marginEnd: 10,
    marginVertical: 10,
  },
  date: {
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    paddingTop: 20,
    color: "#6D6D6D",
  },
  line: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingTop: 2,
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default Header;
