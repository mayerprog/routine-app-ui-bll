import React, { useDebugValue, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import MediaContainer from "./MediaContainer";
import LinkContainer from "./LinkContainer";

const MediaAttachments = ({
  linkData,
  linkName,
  links,
  setLinkName,
  setLink,
  addLinks,
  removeLinks,
  dispatch,
}) => {
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
      {cameraPressed && <MediaContainer />}
      {linkPressed && (
        <LinkContainer
          linkData={linkData}
          linkName={linkName}
          setLink={setLink}
          setLinkName={setLinkName}
          addLinks={addLinks}
          removeLinks={removeLinks}
          dispatch={dispatch}
          links={links}
        />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
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
});

export default MediaAttachments;
