import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const MediaAttachments = () => {
  const [cameraPressed, setCameraPressed] = useState(false);
  const [linkPressed, setLinkPressed] = useState(false);

  const pressCamera = () => {
    setCameraPressed(!cameraPressed);
    setLinkPressed(false);
  };

  const pressLink = () => {
    setLinkPressed(!linkPressed);
    setCameraPressed(false);
  };

  return (
    <View>
      {/* зерефакторить код, вынести прессаблконтейнер в отдельный компонент(в том же файле) */}

      {cameraPressed && (
        <View style={[styles.container, { marginBottom: 17, marginTop: 25 }]}>
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
            >
              {({ pressed }) => (
                <FontAwesome
                  name="camera"
                  size={23}
                  style={{ color: pressed ? "white" : "black" }}
                />
              )}
            </Pressable>
            <Text style={styles.pressableContainerText}>Take a picture</Text>
          </View>
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
            >
              {({ pressed }) => (
                <FontAwesome
                  name="image"
                  size={23}
                  style={{ color: pressed ? "white" : "black" }}
                />
              )}
            </Pressable>
            <Text style={styles.pressableContainerText}>Media</Text>
          </View>
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
            >
              {({ pressed }) => (
                <Ionicons
                  name="document-attach"
                  size={24}
                  style={{ color: pressed ? "white" : "black" }}
                />
              )}
            </Pressable>
            <Text style={styles.pressableContainerText}>Document</Text>
          </View>
        </View>
      )}
      {linkPressed && (
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Link name"
            placeholderTextColor="#ccc"
            onChangeText={() => console.log("clicked")}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Link"
            placeholderTextColor="#ccc"
            onChangeText={() => console.log("clicked")}
          />
          <CustomButton
            label="Add"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#A2C5FF" }]}
            textButtonStyle={styles.textButtonStyle}
          />
        </View>
      )}

      <View style={styles.container}>
        <Pressable hitSlop={10} onPress={pressCamera}>
          <FontAwesome
            name="camera"
            size={43}
            style={{ color: cameraPressed ? "#21A098" : "black" }}
          />
        </Pressable>

        <Pressable hitSlop={10} onPress={pressLink}>
          {/* <Image
            source={require("../assets/images/link.png")}
            style={[
              { tintColor: linkPressed ? "#21A098" : "black" },
              { height: 40, width: 40 },
            ]}
          /> */}
          <FontAwesome5
            name="link"
            size={40}
            color={linkPressed ? "#21A098" : "black"}
          />
        </Pressable>
      </View>
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
});

export default MediaAttachments;
