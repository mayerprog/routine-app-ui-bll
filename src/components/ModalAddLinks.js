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

const AddLinkContainer = ({
  linkData,
  linkName,
  links,
  setLinkName,
  setLinkData,
  addLinks,
  removeLinks,
  dispatch,
  setModalVisible,
}) => {
  let isButtonDisabled;

  const makeLinkObj = () => {
    Keyboard.dismiss();
    const newObject = { name: linkName, link: linkData };
    dispatch(addLinks(newObject));
    setLinkName("");
    setLinkData("");
  };

  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };

  if (linkData === "" || linkName === "") {
    isButtonDisabled = true;
  }
  return (
    <View style={{ alignItems: "center", marginTop: 15 }}>
      {links.map((l, index) => (
        <View style={{ marginBottom: 8 }} key={index}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="link" size={17} color="#D4D4D4" />
            <Text style={styles.linkText}>{l.name}</Text>
            <TouchableOpacity
              style={{ marginTop: 1 }}
              onPress={() => handleRemoveItem(l.id)}
              hitSlop={5}
            >
              <MaterialIcons name="cancel" size={18} color="#800B35" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
        action={makeLinkObj}
        underlayColor="#5884CD"
        buttonDisabled={isButtonDisabled}
      />
      <CustomButton
        label="Cancel"
        buttonStyle={[styles.buttonStyle, { backgroundColor: "#A2C5FF" }]}
        textButtonStyle={styles.textButtonStyle}
        action={() => setModalVisible(false)}
        underlayColor="#5884CD"
        buttonDisabled={isButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 380,
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
    borderColor: "#1B57B8",
    borderWidth: 0.5,
  },
  textButtonStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: "#1B57B8",
  },
});

export default AddLinkContainer;
