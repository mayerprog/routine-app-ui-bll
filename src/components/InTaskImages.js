import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  removeInTaskImages,
  addDeletedImages,
  removeImages,
} from "../redux/slices/taskSlice";
const { baseURL } = require("../../config");
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { selectImage } from "../services/imagePickerHelper";
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
import PressableContainer from "./PressableContainer";

const InTaskImages = ({ images, dispatch, addedImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraColor, setCameraColor] = useState("black");
  const [mediaColor, setMediaColor] = useState("black");
  const [docColor, setDocColor] = useState("black");

  const handleImagePress = (image, isFromDB) => {
    const imageSource = isFromDB ? baseURL + `/uploads/${image.name}` : image;
    setSelectedImage({ uri: imageSource });
    setModalVisible(true);
  };

  const handleRemoveItem = (image, isFromDB) => {
    if (isFromDB) {
      dispatch(removeInTaskImages(image._id));
      dispatch(addDeletedImages(image.name)); //to delete from DB
    } else {
      dispatch(removeImages(image));
      console.log("addedImages", addedImages);
    }
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
    <View>
      <View
        style={{
          alignSelf: "center",
          paddingTop: 15,
        }}
      >
        {images.length === 0 && addedImages.length === 0 ? (
          <Text style={styles.nothingAddedText}>{"No media added"}</Text>
        ) : (
          <>
            {images.map((image, index) => (
              <ImageComponent
                key={`db-${index}`}
                image={image}
                baseURL={baseURL}
                handleImagePress={handleImagePress}
                handleRemoveItem={handleRemoveItem}
                isFromDB={true}
              />
            ))}
            {addedImages.map((uri, index) => (
              <ImageComponent
                key={`local-${index}`}
                image={uri}
                handleImagePress={handleImagePress}
                handleRemoveItem={handleRemoveItem}
                isFromDB={false}
              />
            ))}
          </>
        )}
      </View>

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
                  source={{ uri: selectedImage?.uri }}
                  style={[styles.fullImage, animatedStyle]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </TouchableOpacity>
      </Modal>
      <View style={styles.container}>
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
          backgroundColor="white"
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
          backgroundColor="white"
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
          backgroundColor="white"
        />
      </View>
    </View>
  );
};

const ImageComponent = ({
  image,
  baseURL,
  handleImagePress,
  handleRemoveItem,
  isFromDB,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={{ flexDirection: "row", paddingVertical: 5, paddingStart: 20 }}
    >
      <TouchableOpacity onPress={() => handleImagePress(image, isFromDB)}>
        <View style={styles.imageContainer}>
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.activityIndicator}
            />
          )}
          <Image
            source={{
              uri: isFromDB ? baseURL + `/uploads/${image.name}` : image,
            }}
            style={[styles.image, { opacity: isLoading ? 0 : 1 }]}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
      </TouchableOpacity>
      <View style={{ alignSelf: "center", paddingStart: 15 }}>
        {!isLoading && (
          <TouchableOpacity
            onPress={() => handleRemoveItem(image, isFromDB)}
            hitSlop={7}
            style={styles.cancelIcon}
          >
            <MaterialIcons name="cancel" size={23} color="#C73232" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
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
    marginTop: -5,
  },
  image: {
    width: "100%",
    height: "100%",
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
  activityIndicator: {
    position: "absolute",
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelIcon: {
    position: "absolute",
    paddingLeft: 10,
  },
});

export default InTaskImages;
