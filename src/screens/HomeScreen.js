import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import CurrentDate from "../components/CurrentDate";
import NewTaskScreen from "./NewTaskScreen";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CurrentDate />

      <View style={styles.tasks}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconStyle}
        >
          <Ionicons name="add-circle" size={70} color="#1B57B8" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <NewTaskScreen setModalVisible={() => setModalVisible(false)} />
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tasks: {
    flexBasis: 655,
    margin: -5,
    backgroundColor: "#DCE8F2",
    // backgroundColor: "#2367D8",
    // opacity: 0.49,
    borderColor: "white",
    borderWidth: 5,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 7,
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 7,
      width: 0,
    },
  },
  iconStyle: {
    alignSelf: "center",
    position: "relative",
    top: 520,
  },
});

export default HomeScreen;
