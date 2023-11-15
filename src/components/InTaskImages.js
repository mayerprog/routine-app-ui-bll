import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { removeLinks } from "../redux/slices/taskSlice";
const { baseURL } = require("../../config");
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

const InTaskImages = ({ images, dispatch }) => {
  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };

  console.log(images);
  return (
    <View style={{ flex: 1 }}>
      {images.length ? (
        images.map((image, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingStart: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => handleRemoveItem(image.id)}
              hitSlop={7}
              style={{
                alignSelf: "flex-end",
                marginEnd: 30,
                marginBottom: -3,
              }}
            >
              <Image
                source={{
                  uri:
                    baseURL +
                    "/uploads/1699984317474-E2FB81CB-20F9-48D7-99A4-E08C22C25A0D.jpg",
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.nothingAddedText}>{"No media added"}</Text>
      )}
      <View style={styles.addIconStyle}>
        <TouchableOpacity onPress={() => setModalVisible(true)} hitSlop={45}>
          <Ionicons name="add-circle-sharp" size={45} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default InTaskImages;
