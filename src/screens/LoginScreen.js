import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import AuthGoogleFB from "../components/AuthGoogleFB";
import { authAPI } from "../api/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setIsAuth } from "../redux/slices/authSlice";
import Logo from "../assets/images/woman-doing-yoga.svg";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.auth.email);

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  async function login() {
    setLoading(true);
    const loginResult = await authAPI.login(email, password);
    dispatch(setIsAuth(loginResult));
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      try {
        const isAuth = await authAPI.isauth();
        dispatch(setIsAuth(isAuth));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <Logo width={300} height={230} style={styles.image} />

          <Text style={styles.text}>Welcome Back!</Text>
          <InputField
            label="Email"
            icon={<Entypo name="email" size={17} style={styles.iconStyle} />}
            keyboardType="email-address"
            valueInput={email}
            actionOnChange={(userEmail) => dispatch(setEmail(userEmail))}
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
                action={login}
                underlayColor="#739AD9"
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
      </TouchableWithoutFeedback>
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
