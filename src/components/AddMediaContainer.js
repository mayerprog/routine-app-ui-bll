import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addImages } from "../redux/slices/taskSlice";

const AddMediaContainer = ({}) => {
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");
  const [imageData, setImageData] = useState();

  const images = useSelector((state) => state.task.images);
  const dispatch = useDispatch();

  const selectImage = async (useLibrary) => {
    let result;

    const formData = new FormData();
    formData.append("image", imageData);

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    if (useLibrary) {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      // setImageData(result.assets[0].uri);
      dispatch(addImages(result.assets[0].uri));
      console.log(imageData);
      // await tasksAPI.uploadImage(formData);
    }
  };

  return (
    <>
      {images.map((image, index) => (
        <View style={{ alignItems: "center" }} key={index}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="link" size={17} color="#D4D4D4" />
            <Text style={styles.linkText}>{image}</Text>
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
          selectItem={() => selectImage(false)}
        />
        <PressableContainer
          icon={
            <FontAwesome name="image" size={23} style={{ color: mediaColor }} />
          }
          containerText="Media"
          setIconColor={setMediaColor}
          selectItem={() => selectImage(true)}
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
    </>
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
  linkText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#EEEEEE",
    marginLeft: 7,
    marginBottom: 5,
    marginRight: 12,
  },
});

export default AddMediaContainer;
