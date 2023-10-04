import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import CurrentDate from "../components/CurrentDate";
import NewTaskScreen from "./NewTaskScreen";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TaskComponent from "../components/TaskComponent";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CurrentDate />

      <View style={styles.tasksArea}>
        <TaskComponent />

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
          <NewTaskScreen setModalVisible={() => setModalVisible(false)} />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tasksArea: {
    flex: 1,
  },
  iconStyle: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    position: "relative",
    bottom: 30,
  },
});

export default HomeScreen;
