import React, { useDebugValue, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import {
  FontAwesome,
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const MediaAttachments = ({
  linkData,
  linkName,
  links,
  setLinkName,
  setLink,
  addLinks,
  dispatch,
}) => {
  const [cameraPressed, setCameraPressed] = useState(false);
  const [linkPressed, setLinkPressed] = useState(false);
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");

  const pressCamera = () => {
    setCameraPressed(!cameraPressed);
    setLinkPressed(false);
  };

  const pressLink = () => {
    setLinkPressed(!linkPressed);
    setCameraPressed(false);
  };

  const makeLinkObj = () => {
    const newObject = { name: linkName, link: linkData };
    dispatch(addLinks(newObject));
    dispatch(setLinkName(""));
    dispatch(setLink(""));
  };

  return (
    <View>
      {/* выделить камеру и линки в отдельные компоненты */}
      {cameraPressed && (
        <View style={[styles.container, { marginBottom: 17, marginTop: 25 }]}>
          <PressableContainer
            icon={
              <FontAwesome
                name="camera"
                size={23}
                style={{ color: cameraColor }}
              />
            }
            containerText="Take a picture"
            setIconColor={setCameraColor}
          />
          <PressableContainer
            icon={
              <FontAwesome
                name="image"
                size={23}
                style={{ color: mediaColor }}
              />
            }
            containerText="Media"
            setIconColor={setMediaColor}
          />
          <PressableContainer
            icon={
              <Ionicons
                name="document-attach"
                size={24}
                style={{ color: docColor }}
              />
            }
            containerText="Document"
            setIconColor={setDocColor}
          />
        </View>
      )}
      {linkPressed && (
        <View style={{ alignItems: "center", marginTop: 15 }}>
          {links.map((l, index) => (
            <View style={{ marginBottom: 8 }} key={index}>
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="link" size={17} color="#D4D4D4" />
                <Text style={styles.linkText}>{l.name}</Text>
              </View>
            </View>
          ))}
          {/* узнать как сделать фокус на полях при вводе */}
          {/* сделать так, чтобы кнопка сразу добавляла без лишнего нажатия на нее */}
          <TextInput
            style={styles.textInput}
            placeholder="Link name"
            placeholderTextColor="#ccc"
            value={linkName}
            onChangeText={(taskLinkName) => dispatch(setLinkName(taskLinkName))}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Link"
            placeholderTextColor="#ccc"
            value={linkData}
            onChangeText={(taskLinkData) => dispatch(setLink(taskLinkData))}
          />
          <CustomButton
            label="Add"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#A2C5FF" }]}
            textButtonStyle={styles.textButtonStyle}
            action={makeLinkObj}
          />
        </View>
      )}

      <View style={styles.container}>
        <Pressable hitSlop={10} onPress={pressCamera}>
          <FontAwesome
            name="camera"
            size={43}
            color={cameraPressed ? "#21A098" : "black"}
            style={styles.imgShadow}
          />
        </Pressable>

        <Pressable hitSlop={10} onPress={pressLink}>
          <FontAwesome5
            name="link"
            size={40}
            color={linkPressed ? "#21A098" : "black"}
            style={styles.imgShadow}
          />
        </Pressable>
      </View>
    </View>
  );
};

const PressableContainer = ({ containerText, icon, setIconColor }) => {
  const handlePressIn = () => {
    setIconColor("white");
  };
  const handlePressOut = () => {
    setIconColor("black");
  };
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Pressable
        hitSlop={10}
        style={({ pressed }) => [
          styles.pressableContainer,
          { backgroundColor: pressed ? "#21A098" : "#1B57B8" },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {icon}
      </Pressable>
      <Text style={styles.pressableContainerText}>{containerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  pressableContainer: {
    width: 80,
    height: 50,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#1B57B8",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  pressableContainerText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    marginTop: 6,
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
  imgShadow: {
    backgroundColor: "transparent",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  linkText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    color: "#06214E",
    marginLeft: 8,
    marginBottom: 5,
  },
});

export default MediaAttachments;
