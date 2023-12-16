import {
  Alert,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addInTaskLinks,
  removeLinks,
  addLinks,
} from "../redux/slices/taskSlice";

import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
              paddingStart: 30,
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => handleRemoveItem(link.id)}
              hitSlop={7}
              style={{
                alignSelf: "flex-end",
                marginEnd: 30,
                marginBottom: -3,
              }}
            >
              <MaterialIcons name="cancel" size={23} color="#ccc" />
            </TouchableOpacity>
            <AntDesign
              name="link"
              size={17}
              color="#474B57"
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
        <CustomButton
          label="Add"
          buttonStyle={[styles.buttonStyle, { backgroundColor: "#F5F9FF" }]}
          textButtonStyle={styles.textButtonStyle}
          action={() => makeLinkObj()}
          buttonDisabled={isButtonDisabled}
        />
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
    color: "#686868",
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
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: "#A1A1A1",
  },
  textButtonStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: "#1B57B8",
  },
});

export default InTaskLinks;
