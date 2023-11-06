import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const AddMediaContainer = ({ selectImage }) => {
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");
  return (
    <View style={[styles.container, { marginBottom: 17, marginTop: 25 }]}>
      <PressableContainer
        icon={
          <FontAwesome name="camera" size={23} style={{ color: cameraColor }} />
        }
        containerText="Take a picture"
        setIconColor={setCameraColor}
        selectItem={() => selectImage(true)}
      />
      <PressableContainer
        icon={
          <FontAwesome name="image" size={23} style={{ color: mediaColor }} />
        }
        containerText="Media"
        setIconColor={setMediaColor}
        selectItem={() => selectImage(false)}
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
  );
};

const PressableContainer = ({
  containerText,
  icon,
  setIconColor,
  selectItem,
}) => {
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
        onPress={selectItem}
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
});

export default AddMediaContainer;
