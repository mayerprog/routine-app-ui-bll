import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

const ModalAddLinks = ({
  linkData,
  linkName,
  setLinkName,
  setLinkData,
  dispatch,
  setModalVisible,
  modalVisible,
  addLinks,
}) => {
  let isButtonDisabled;

  const makeLinkObj = () => {
    const newObject = { name: linkName, link: linkData };
    dispatch(addLinks(newObject));
    setModalVisible(!modalVisible);
    setLinkName("");
    setLinkData("");
  };

  if (linkData === "" || linkName === "") {
    isButtonDisabled = true;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Link name"
        placeholderTextColor="#ccc"
        value={linkName}
        onChangeText={(taskLinkName) => setLinkName(taskLinkName)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Link"
        placeholderTextColor="#ccc"
        value={linkData}
        onChangeText={(taskLinkData) => setLinkData(taskLinkData)}
      />
      <CustomButton
        label="Add"
        buttonStyle={[styles.buttonStyle, { backgroundColor: "#A2C5FF" }]}
        textButtonStyle={styles.textButtonStyle}
        action={() => makeLinkObj()}
        underlayColor="#5884CD"
        buttonDisabled={isButtonDisabled}
      />
      <CustomButton
        label="Cancel"
        buttonStyle={[
          styles.buttonStyle,
          { backgroundColor: "#DEEDFB", marginTop: 15 },
        ]}
        textButtonStyle={styles.textButtonStyle}
        action={() => setModalVisible(!modalVisible)}
        underlayColor="#5884CD"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6F90C5",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  linkText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#EEEEEE",
    marginLeft: 7,
    marginBottom: 5,
    marginRight: 12,
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: "#A1A1A1",
    backgroundColor: "white",
    width: 320,
    paddingLeft: 15,
    height: 45,
    marginBottom: 5,
  },
  buttonStyle: {
    width: 95,
    height: 40,
    marginTop: 7,
    paddingBottom: 5,
    paddingTop: 11,
    paddingHorizontal: 5,
    borderColor: "#1B57B8",
    borderWidth: 0.5,
  },
  textButtonStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: "#1B57B8",
  },
});

export default ModalAddLinks;
