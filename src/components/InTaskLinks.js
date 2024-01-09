import {
  Alert,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addInTaskLinks,
  removeLinks,
  addLinks,
} from "../redux/slices/taskSlice";

import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import CustomButton from "./CustomButton";

const InTaskLinks = ({ links, checkIfURLCanBeOpened, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkData, setLinkData] = useState("");
  const [linkName, setLinkName] = useState("");
  let isButtonDisabled;

  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };

  const makeLinkObj = () => {
    const newObject = { name: linkName, link: linkData };
    dispatch(addLinks(newObject));
    setModalVisible(!modalVisible);
    setLinkName("");
    setLinkData("");
  };

  if (linkData === "" || linkName === "") {
    isButtonDisabled = true;
  }
  return (
    <View style={{ flex: 1 }}>
      {links.length ? (
        links.map((link, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingStart: 40,
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => handleRemoveItem(link.id)}
              hitSlop={7}
              style={{
                alignSelf: "flex-end",
                marginEnd: 30,
                marginBottom: -2,
              }}
            >
              <MaterialIcons name="cancel" size={21} color="#C73232" />
            </TouchableOpacity>

            <Entypo
              name="link"
              size={18}
              color="black"
              style={{ alignSelf: "flex-end", marginEnd: 10 }}
            />

            <TouchableOpacity
              onPress={() => checkIfURLCanBeOpened(link.link)}
              hitSlop={{ top: 10, bottom: 10, left: 45, right: 45 }}
            >
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.nothingAddedText}>{"No links added"}</Text>
      )}
      <View style={styles.centeredView}>
        <TextInput
          style={styles.textInput}
          placeholder="Link name"
          placeholderTextColor="#ccc"
          value={linkName}
          onChangeText={(taskLinkName) => setLinkName(taskLinkName)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Link"
          placeholderTextColor="#ccc"
          value={linkData}
          onChangeText={(taskLinkData) => setLinkData(taskLinkData)}
        />
        <TouchableHighlight
          onPress={() => makeLinkObj()}
          style={styles.buttonStyle}
          activeOpacity={0.5}
          disabled={isButtonDisabled}
          underlayColor="#759AD6"
        >
          <Text style={styles.textButtonStyle}>Add</Text>
        </TouchableHighlight>
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
  linkText: {
    fontSize: 17,
    marginTop: 15,
    textDecorationLine: "underline",
    color: "#1B57B8",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  linkText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#1B57B8",
  },
  textInput: {
    fontSize: 15,
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: "#A1A1A1",
    backgroundColor: "white",
    width: 300,
    paddingLeft: 15,
    height: 40,
    marginBottom: 5,
    borderRadius: 10,
  },
  buttonStyle: {
    width: 90,
    height: 40,
    marginTop: 7,
    paddingBottom: 5,
    paddingTop: 11,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 0.5,
    borderColor: "#A1A1A1",
    borderRadius: 14,
    alignSelf: "center",
  },
  textButtonStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: "#1B57B8",
    alignSelf: "center",
  },
});

export default InTaskLinks;
