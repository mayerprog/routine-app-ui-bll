import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React from "react";

const CustomButton = ({
  label,
  action,
  buttonStyle,
  textButtonStyle,
  buttonDisabled,
  underlayColor,
}) => {
  return (
    <TouchableHighlight
      onPress={action}
      style={[styles.loginButtonContainer, buttonStyle]}
      activeOpacity={0.5}
      underlayColor={underlayColor}
      disabled={buttonDisabled}
    >
      <Text style={[styles.loginButtonText, textButtonStyle]}>{label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  loginButtonContainer: {
    backgroundColor: "#1B57B8",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 330,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    color: "white",
  },
});

export default CustomButton;
