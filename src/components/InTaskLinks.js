import {
  Alert,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addInTaskLinks,
  removeLinks,
  addLinks,
} from "../redux/slices/taskSlice";

import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalAddLinks from "./ModalAddLinks";
import { useState } from "react";

const InTaskLinks = ({ links, checkIfURLCanBeOpened, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkData, setLinkData] = useState("");
  const [linkName, setLinkName] = useState("");

  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };
  return (
    <View style={{ flex: 1 }}>
      {links.length ? (
        links.map((link, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingStart: 30,
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ModalAddLinks
            dispatch={dispatch}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            addLinks={addLinks}
            linkData={linkData}
            linkName={linkName}
            setLinkData={setLinkData}
            setLinkName={setLinkName}
          />
        </View>
      </Modal>
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
    marginBottom: 150,
  },
});

export default InTaskLinks;
