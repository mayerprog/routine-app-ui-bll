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
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TaskLinkComponent from "../components/TaskLinkComponent";
import { tasksAPI } from "../api/tasksAPI";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/slices/taskSlice";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    (async () => {
      try {
        const getAll = await tasksAPI.getAll();
        dispatch(setTasks(getAll));
        // console.log(tasks);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CurrentDate />

      <View style={styles.tasksArea}>
        <TaskLinkComponent tasks={tasks} setModalVisible={setModalVisible} />

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <NewTaskScreen setModalVisible={setModalVisible} />
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
    alignSelf: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
});

export default HomeScreen;
