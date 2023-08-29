import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({ label, action }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log("pressed")}
      style={styles.loginButtonContainer}
      activeOpacity={0.9}
    >
      <Text style={styles.loginButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButtonContainer: {
    elevation: 10,
    backgroundColor: "#1B57B8",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 330,
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
});

export default CustomButton;
