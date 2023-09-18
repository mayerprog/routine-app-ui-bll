import {
  Image,
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
          <Image
            source={require("../assets/images/add-button.png")}
            style={styles.iconShadow}
          />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <NewTaskScreen setModalVisible={() => setModalVisible(false)} />
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
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 5,
    overflow: "hidden",
    shadowColor: "#484848",
    shadowRadius: 7,
    shadowOpacity: 1,
  },
  iconStyle: {
    alignSelf: "center",
    position: "relative",
    top: 550,
  },
  iconShadow: {
    height: 60,
    width: 60,
  },
});

export default HomeScreen;
