import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { removeLinks } from "../redux/slices/taskSlice";
const { baseURL } = require("../../config");
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { useRef, useState } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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

  const panRef = useRef();
  const pinchRef = useRef();
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const onPinchEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const onPanEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    },
    onEnd: () => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { scale: scale.value },
      ],
    };
  });

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
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <PanGestureHandler
            onGestureEvent={onPanEvent}
            ref={panRef}
            simultaneousHandlers={[pinchRef]}
          >
            <Animated.View style={styles.modalView}>
              <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={onPinchEvent}
                simultaneousHandlers={[panRef]}
              >
                <Animated.Image
                  source={{ uri: baseURL + `/uploads/${selectedImage?.name}` }}
                  style={[styles.fullImage, animatedStyle]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
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
