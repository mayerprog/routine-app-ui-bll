import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { addInTaskLinks, addInTaskImages } from "../redux/slices/taskSlice";
import ChooseTimeComponent from "../components/ChooseTimeComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/slices/taskSlice";
import { tasksAPI } from "../api/tasksAPI";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalAddLinks from "../components/ModalAddLinks";
import InTaskLinks from "../components/InTaskLinks";
import InTaskImages from "../components/InTaskImages";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DatePicker from "../components/DatePicker";

const InTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [taskDate, setTaskDate] = useState("");
  const [dateForDisplay, setDateForDisplay] = useState();

  const dispatch = useDispatch();
  const links = useSelector((state) => state.task.links);
  const images = useSelector((state) => state.task.images);
  const [selectedDate, setSelectedDate] = useState(task.date);

  let updatedTask = { ...task, links: [...task.links] }; //deep copy

  const currentTime = new Date();
  const dateInTask = new Date(task.specificDate).toLocaleString().slice(0, 17);

  useEffect(() => {
    dispatch(addInTaskLinks(task.links));
    dispatch(addInTaskImages(task.images));
  }, []);

  const checkIfURLCanBeOpened = async (url) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        alert(`The URL is invalid`);
      }
    } catch (error) {
      console.error("Error checking if URL can be opened: ", error);
    }
  };

  const updateTask = async () => {
    setButtonLoading(true);
    updatedTask.title = title;
    updatedTask.description = description;
    updatedTask.links = links;
    updatedTask.notificationDate = selectedDate;
    console.log("updatedtask", updatedTask);
    dispatch(editTask(updatedTask));
    await tasksAPI.updateTask(task._id, updatedTask);
    navigation.goBack();
    setButtonLoading(false);
  };

  const [open, setOpen] = useState(false);

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 70,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <TextInput
              style={[
                styles.textStyle,
                { fontFamily: "Roboto-Medium", fontSize: 24 },
              ]}
              placeholder="Title"
              defaultValue={title}
              onChangeText={(taskTitle) => setTitle(taskTitle)}
            />

            <TextInput
              style={[styles.textStyle, { paddingHorizontal: 12 }]}
              multiline={true}
              maxLength={2000}
              placeholder="Description"
              defaultValue={description}
              onChangeText={(taskDescription) =>
                setDescription(taskDescription)
              }
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.labelText}>Links</Text>
            <View style={styles.shadowedUnderline} />
            <InTaskLinks
              checkIfURLCanBeOpened={checkIfURLCanBeOpened}
              dispatch={dispatch}
              links={links}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.labelText}>Media</Text>
            <View style={styles.shadowedUnderline} />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <InTaskImages dispatch={dispatch} images={images} />
            </GestureHandlerRootView>
          </View>

          <View style={[styles.contentContainer, { zIndex: 1000 }]}>
            <Text style={styles.labelText}>When?</Text>
            <View style={styles.shadowedUnderline} />
            <View>
              <DatePicker
                valueDate={dateForDisplay}
                dateAction={setTaskDate}
                displayType="inline"
                dateInputStyle={styles.dateInputStyle}
                placeholderTextColor="black"
                placeholder={dateInTask}
                iconColor="white"
                mode="datetime"
                cancelButtonColor="#DAD9D9"
                maximumDate={null}
                minimumDate={currentTime}
                setDateForDisplay={setDateForDisplay}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <ChooseTimeComponent
                setSelectedDate={setSelectedDate}
                dropDownDirection="BOTTOM"
                placeholderValue="Repeat..."
                setOpen={setOpen}
                open={open}
              />
            </View>
          </View>

          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 25,
              paddingBottom: 10,
            }}
          >
            <CustomButton
              label="Cancel"
              buttonStyle={styles.buttonStyle}
              textButtonStyle={styles.textButtonStyle}
              action={() => navigation.goBack()}
              underlayColor="#5884CD"
            />
            {buttonLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{}} />
            ) : (
              <CustomButton
                label="Save"
                buttonStyle={[
                  styles.buttonStyle,
                  { backgroundColor: "#D1E0F9" },
                ]}
                textButtonStyle={[styles.textButtonStyle, { color: "#5884CD" }]}
                underlayColor="#002594"
                action={updateTask}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingVertical: 13,
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 10,
    minHeight: 160,
    maxHeight: "auto",
  },
  shadowedUnderline: {
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
  labelText: {
    alignSelf: "center",
    color: "#6A6A6A",
    marginBottom: 5,
  },
  nothingAddedText: {
    alignSelf: "center",
    marginTop: 10,
  },
  buttonStyle: {
    width: 140,
    height: 45,
    backgroundColor: "#4676C5",
    paddingVertical: 13,
  },
  textButtonStyle: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  textInputStyle: {
    borderRadius: 30,
    width: 200,
  },
  dateInputStyle: {
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 15,
    width: 380,
    borderColor: "black",
    backgroundColor: "white",
  },
});

export default InTaskScreen;
