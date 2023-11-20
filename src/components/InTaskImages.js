import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { removeLinks } from "../redux/slices/taskSlice";
const { baseURL } = require("../../config");
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { useRef, useState } from "react";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
// import Animated from "react-native-reanimated";

const InTaskImages = ({ images, dispatch }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
      }}
    >
      {images.length ? (
        images.map((image, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingStart: 20,
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => handleImagePress(image)}
            >
              <Image
                source={{
                  uri: baseURL + `/uploads/${image.name}`,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("click")}
              hitSlop={7}
              style={{
                alignSelf: "center",
                marginLeft: 15,
              }}
            >
              <MaterialIcons name="cancel" size={23} color="#C73232" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.nothingAddedText}>{"No media added"}</Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1} // Keeps the background from visually responding to touches
          onPress={() => setModalVisible(false)} // Closes modal when background is pressed
        >
          <View style={styles.modalView}>
            <Image
              source={{ uri: baseURL + `/uploads/${selectedImage?.name}` }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.addIconStyle}>
        <TouchableOpacity
          onPress={() => console.log("clickclick")}
          hitSlop={45}
        >
          <Ionicons name="add-circle-sharp" size={45} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  addIconStyle: {
    marginTop: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
    flex: 1,
  },
  nothingAddedText: {
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  modalView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "90%",
  },
});

export default InTaskImages;
