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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  const dispatch = useDispatch();
  async function logout() {
    const logoutResult = await authAPI.logout();
    dispatch(setIsAuth(logoutResult));
  }
  return (
    <View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: -13 }}>
          <Ionicons
            name="checkmark-done"
            size={38}
            color="black"
            style={styles.doneImg}
          />
          <Text style={styles.headerText}>
            My
            {"\n"}
            Routine
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={logout} style={{ marginTop: -7 }}>
            <MaterialIcons name="logout" size={35} color="#C94E4E" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 10,
              marginTop: 0,
            }}
          >
            Log Out
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.linesStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
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
