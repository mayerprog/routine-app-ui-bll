import {
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      // shouldPlaySound: false,
      // shouldSetBadge: false,
    };
  },
});

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

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

  useEffect(() => {
    async function handleNotificationPermissions() {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
    }

    handleNotificationPermissions().catch((error) => {
      alert(error);
    });
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received!");
        console.log(notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Clicked!");
        console.log(response.notification.request.content);
      });
    return () => {
      // unsubscribe when component unmounts
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "Hello this is a local notification!",
      },
      trigger: { seconds: 1 },
    });
  };

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

        <Button
          title="Trigger Local Notification"
          onPress={triggerLocalNotificationHandler}
        />
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
});

export default HomeScreen;
