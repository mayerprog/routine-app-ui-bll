import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/yoga-login.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome Back!</Text>

      <View style={styles.form}>
        <Entypo name="email" size={17} color="#666" style={styles.iconStyle} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.form}>
        <Ionicons
          name="ios-key-outline"
          size={22}
          color="#666"
          style={styles.iconStyle}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => console.log("touched")}>
        <Text style={styles.opacityText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginButtonContainer}
        activeOpacity={0.9}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.underButton}>
        <Text style={styles.underButtonText}>Do you have an account?</Text>
        <TouchableOpacity onPress={() => console.log("clicked")}>
          <Text style={styles.opacityText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line}>
        <View style={styles.linesStyle} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
        </View>
        <View style={styles.linesStyle} />
      </View>
      <View style={styles.media}>
        <TouchableOpacity
          onPress={() => console.log("oops")}
          style={styles.mediaOpacity}
        >
          <Image
            source={require("../assets/images/google.png")}
            style={styles.mediaImg}
          />
          <Text style={styles.mediaText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("oops")}
          style={styles.mediaOpacity}
        >
          <Image
            source={require("../assets/images/facebook.png")}
            style={styles.mediaImg}
          />
          <Text style={styles.mediaText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
  },
  image: {
    alignSelf: "center",
    height: 230,
    width: 230,
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
  },
  form: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  iconStyle: {
    marginRight: 5,
    paddingTop: 6,
    paddingBottom: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 1,
  },
  opacityText: {
    color: "#1B57B8",
    fontWeight: "800",
    alignSelf: "flex-end",
    fontSize: 15,
  },
  loginButtonContainer: {
    elevation: 10,
    backgroundColor: "#1B57B8",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 330,
    marginTop: 30,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginButtonText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  underButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 25,
  },
  underButtonText: {
    fontFamily: "Lexend-Regular",
    fontWeight: "900",
    marginRight: 7,
    fontSize: 15,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  mediaOpacity: {
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  mediaText: {
    fontFamily: "Lexend-Regular",
    color: "#7B7B7B",
    marginStart: 10,
    marginTop: 7,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  mediaImg: {
    height: 35,
    width: 35,
  },
});

export default LoginScreen;
