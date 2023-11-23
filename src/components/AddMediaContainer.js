import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addImages, removeImages } from "../redux/slices/taskSlice";
import CustomButton from "./CustomButton";
import { tasksAPI } from "../api/tasksAPI";
import * as FileSystem from "expo-file-system";

const { baseURL } = require("../../config");

const AddMediaContainer = ({}) => {
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");

  const images = useSelector((state) => state.task.images);
  const dispatch = useDispatch();

  const selectImage = async (useLibrary) => {
    let result;
    const MAX_SIZE = 7 * 1024 * 1024;

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    };

    try {
      if (useLibrary) {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync(options);
      }

      if (!result.canceled) {
        const pickedImages = result.assets;
        console.log(pickedImages);

        pickedImages.forEach(async (image) => {
          const imageURI = image.uri;
          const fileInfo = await FileSystem.getInfoAsync(imageURI);
          if (fileInfo.size > MAX_SIZE) {
            alert(
              "File is too large. Please upload an image smaller than 7 MB."
            );
            return;
          }
          dispatch(addImages(imageURI));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const postImage = async () => {
  //   const formData = new FormData();

  //   console.log("Images", images);

  //   images.forEach((image) => {
  //     const fileName = image.split("/").pop();
  //     const fileType = fileName.split(".").pop();
  //     formData.append("image", {
  //       name: fileName,
  //       image,
  //       type: `image/${fileType}`,
  //     });
  //   });
  //   return formData;
  // };

  // const addImage = async () => {
  //   const formData = await postImage();
  //   await tasksAPI.uploadImage(formData);
  // };

  return (
    <>
      {images.map((image, index) => (
        <View style={{ alignItems: "center" }} key={index}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="link" size={17} color="#D4D4D4" />
            <Text style={styles.linkText}>{image.split("/").pop()}</Text>
            <TouchableOpacity
              style={{ marginTop: 1 }}
              onPress={() => dispatch(removeImages(image))}
              hitSlop={3}
            >
              <MaterialIcons name="cancel" size={18} color="#800B35" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* <Image
        source={{
          uri: "http://192.168.10.125:3000/uploads/1700036526569-1044FE4F-F662-4F21-AAC9-C2C4C5F22583.jpg",
        }}
        style={styles.image}
      /> */}
      {/* <CustomButton action={addImage} label="add image" /> */}
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
    fontSize: 15,
    color: "#EEEEEE",
    marginLeft: 7,
    marginBottom: 15,
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
  },
});

export default AddMediaContainer;
