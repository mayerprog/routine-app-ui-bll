import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import AuthGoogleFB from "../components/AuthGoogleFB";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Image
          source={require("../assets/images/yoga-login.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Welcome Back!</Text>
        <InputField
          label="Email"
          icon={<Entypo name="email" size={17} style={styles.iconStyle} />}
          keyboardType="email-address"
          valueInput={email}
          actionOnChange={(userEmail) => setEmail(userEmail)}
        />
        <InputField
          label="Password"
          icon={
            <Ionicons
              name="ios-key-outline"
              size={22}
              style={styles.iconStyle}
            />
          }
          inputType="password"
          valuePassword={password}
          actionOnChange={(userPassword) => setPassword(userPassword)}
        />

        <TouchableOpacity onPress={() => console.log("touched")}>
          <Text style={styles.opacityText}>Forgot password?</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{ marginTop: 25 }}>
            <CustomButton
              label="Login"
              email={email}
              password={password}
              action={{}}
            />
          </View>
        )}

        <View style={styles.underButton}>
          <Text style={styles.underButtonText}>
            You don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.opacityText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <AuthGoogleFB />
      </KeyboardAvoidingView>
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
  iconStyle: {
    marginRight: 5,
    paddingTop: 6,
    paddingBottom: 3,
    color: "#666",
  },
  opacityText: {
    color: "#1B57B8",
    fontWeight: "800",
    alignSelf: "flex-end",
    fontSize: 15,
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
});

export default LoginScreen;
