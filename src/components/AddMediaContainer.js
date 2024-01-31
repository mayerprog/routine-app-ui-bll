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
import PressableContainer from "./PressableContainer";
import { selectImage } from "../services/imagePickerHelper";

const { baseURL } = require("../../config");

const AddMediaContainer = ({}) => {
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");

  const images = useSelector((state) => state.task.images);
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View style={{ margin: 5 }} key={index}>
            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: image }} style={styles.image} />

              <TouchableOpacity
                style={{}}
                onPress={() => dispatch(removeImages(image))}
                hitSlop={3}
              >
                <MaterialIcons name="cancel" size={18} color="#800B35" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
          selectItem={() => selectImage(false, dispatch)}
          iconColorIn="white"
          iconColorOut="black"
          backgroundColor="#1B57B8"
          shadowStyle={styles.shadowStyle}
        />
        <PressableContainer
          icon={
            <FontAwesome name="image" size={23} style={{ color: mediaColor }} />
          }
          containerText="Media"
          setIconColor={setMediaColor}
          selectItem={() => selectImage(true, dispatch)}
          iconColorIn="white"
          iconColorOut="black"
          backgroundColor="#1B57B8"
          shadowStyle={styles.shadowStyle}
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
          iconColorIn="white"
          iconColorOut="black"
          backgroundColor="#1B57B8"
          shadowStyle={styles.shadowStyle}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
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
  shadowStyle: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default AddMediaContainer;
