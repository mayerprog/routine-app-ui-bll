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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import AuthGoogleFB from "../components/AuthGoogleFB";
import DatePicker from "../components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setBirthDate,
  setEmail,
  setFullName,
  setIsAuth,
} from "../redux/slices/authSlice";
import { authAPI } from "../api/usersAPI";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.auth.email);
  const fullname = useSelector((state) => state.auth.fullname);
  const birthdate = useSelector((state) => state.auth.birthdate);
  const dispatch = useDispatch();
  const [dateForDisplay, setDateForDisplay] = useState();

  const [password, setPassword] = useState("");

  async function register(email, password, fullname, birthdate) {
    setLoading(true);

    const registerResult = await authAPI.register(
      email,
      password,
      fullname,
      birthdate
    );
    console.log(registerResult);

    dispatch(setIsAuth(registerResult));
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>Welcome Onboard!</Text>
          <Text style={styles.smallText}>
            Let's help you in completing your routine
          </Text>

          <InputField
            label="Full name"
            icon={<Ionicons name="person" size={17} style={styles.iconStyle} />}
            valueInput={fullname}
            actionOnChange={(name) => dispatch(setFullName(name))}
          />
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
                size={17}
                style={styles.iconStyle}
              />
            }
            inputType="password"
            valuePassword={password}
            actionOnChange={(userPassword) => setPassword(userPassword)}
          />
          <InputField
            label="Confirm password"
            icon={
              <Ionicons
                name="ios-key-outline"
                size={17}
                style={styles.iconStyle}
              />
            }
            inputType="password"
            valuePassword={password}
            actionOnChange={(userPassword) => setPassword(userPassword)}
          />
          <DatePicker
            valueDate={dateForDisplay}
            dateAction={(date) => dispatch(setBirthDate(date))}
            displayType="spinner"
            datePickerHeight={150}
            placeholder="Date of birth"
            iconColor="grey"
            mode="date"
            cancelButtonColor="#11182711"
            maximumDate={new Date("2023-1-1")}
            minimumDate={new Date("1930-1-1")}
            setDateForDisplay={setDateForDisplay}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={{ marginTop: 20 }}>
              <CustomButton
                label="Register"
                email={email}
                password={password}
                underlayColor="#739AD9"
                action={() => register(email, password, fullname, birthdate)}
              />
            </View>
          )}

          <View style={styles.underButton}>
            <Text style={styles.underButtonText}>Do you have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.opacityText}>Sign in</Text>
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
  text: {
    fontSize: 22,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 8,
  },
  smallText: {
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 44,
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

export default RegisterScreen;
