import {
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Header from "../components/Header";
import CurrentDate from "../components/CurrentDate";
import NewTaskScreen from "./NewTaskScreen";
import { useEffect, useState } from "react";
import TaskListComponent from "../components/TaskListComponent";
import { tasksAPI } from "../api/tasksAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  removeTasks,
  removeAllLinks,
} from "../redux/slices/taskSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { Button } from "@react-native-material/core";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    (async () => {
      try {
        const getAll = await tasksAPI.getAll();
        dispatch(setTasks(getAll));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // const triggerLocalNotificationHandler = () => {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Local Notification",
  //       body: "Hello this is a local notification!",
  //     },
  //     trigger: { seconds: 1 },
  //   });
  // };

  // const triggerPushNotificationHandler = async () => {
  //   console.log("trigger push fired");

  //   try {
  //     const response = await fetch("https://exp.host/--/api/v2/push/send", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Accept-Encoding": "gzip,deflate",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         to: "ExponentPushToken[j6nAOQE17T_8LpVXvUqY2M]",
  //         title,
  //         body,
  //       }),
  //     });

  //     console.log("POST RESPONSE: " + JSON.stringify(response));
  //   } catch (error) {
  //     console.log("error in push", error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CurrentDate />

      <View style={styles.tasksArea}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TaskListComponent
            tasks={tasks}
            setModalVisible={setModalVisible}
            removeTasks={removeTasks}
            navigation={navigation}
          />
        </GestureHandlerRootView>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <NewTaskScreen setModalVisible={setModalVisible} />
        </Modal>

        {/* <Button
          title="Trigger Local Notification"
          onPress={triggerLocalNotificationHandler}
        />
        <TextInput
          style={styles.textInput}
          value={title}
          placeholder="Title"
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.textInput}
          value={body}
          placeholder="Body"
          onChangeText={setBody}
        />
        <Button
          title="Trigger Push Notification"
          onPress={triggerPushNotificationHandler}
        /> */}
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
  textInput: {
    borderBottomWidth: 1,
    padding: 5,
    margin: 15,
    width: "80%",
  },
});

export default HomeScreen;
