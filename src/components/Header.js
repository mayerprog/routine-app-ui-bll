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

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => console.log("calendar clicked")}>
        <Image
          source={require("../assets/images/calendar.png")}
          style={{ height: 35, width: 35 }}
        />
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: -9, marginLeft: 12 }}>
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
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
});

export default Header;
