import {
  ActivityIndicator,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLinks,
  addLinks,
  addTasks,
  removeAllLinks,
  removeAllImages,
} from "../redux/slices/taskSlice";

import CustomButton from "../components/CustomButton";
import ChooseTimeComponent from "../components/ChooseTimeComponent";
import { tasksAPI } from "../api/tasksAPI";
import { setTasks } from "../redux/slices/taskSlice";

import { useEffect, useState } from "react";
import TaskAttachments from "../components/TaskAttachments";
import DatePicker from "../components/DatePicker";
import { removeBirthDate } from "../redux/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { postImage } from "../services/postImage";

const NewTaskScreen = ({ setModalVisible }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkData, setLinkData] = useState("");
  const [linkName, setLinkName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [dateForDisplay, setDateForDisplay] = useState("");

  const links = useSelector((state) => state.task.links);
  const images = useSelector((state) => state.task.images);

  const currentTime = new Date();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllLinks());
    dispatch(removeBirthDate());
    dispatch(removeAllImages());
  }, []);

  async function createTask() {
    const formData = await postImage(images);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log("formData", formData);
    if (title === "") alert("Please add title");
    // else if (description === "") alert("Please add description");
    else if (taskDate === "") alert("Please choose date");
    else {
      setLoading(true);
      const newSavedTask = await tasksAPI.createTask(
        title,
        description,
        taskDate,
        timeZone,
        links,
        formData
      );
      dispatch(addTasks(newSavedTask));
      setModalVisible(false);
      setLoading(false);
    }
  }
  const [open, setOpen] = useState(false);

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setOpen(false);
  };

  return (
    // <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ top: 15 }}>
            <View>
              <Text style={styles.header}>New Task</Text>
              <View style={styles.underLine} />
            </View>

            <View>
              <Text style={styles.text}>Task Title</Text>
              <TextInput
                style={[styles.textInput, { height: 50 }]}
                placeholder="Name the task"
                placeholderTextColor="#ccc"
                value={title}
                onChangeText={(taskTitle) => setTitle(taskTitle)}
              />
            </View>

            <View>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={[styles.textInput, { height: 150, paddingTop: 10 }]}
                maxLength={2000}
                multiline={true}
                placeholder="Add description..."
                placeholderTextColor="#ccc"
                value={description}
                onChangeText={(taskDescription) =>
                  setDescription(taskDescription)
                }
              />
            </View>

            <>
              <Text style={styles.text}>When?</Text>

              <DatePicker
                valueDate={dateForDisplay}
                dateAction={setTaskDate}
                displayType="inline"
                dateInputStyle={styles.dateInputStyle}
                placeholderTextColor="white"
                placeholder="Choose date"
                iconColor="white"
                mode="datetime"
                cancelButtonColor="#DAD9D9"
                maximumDate={null}
                minimumDate={currentTime}
                setDateForDisplay={setDateForDisplay}
              />
              <ChooseTimeComponent
                setSelectedDate={setSelectedDate}
                dropDownDirection="BOTTOM"
                placeholderValue="Repeat..."
                setOpen={setOpen}
                open={open}
              />
            </>

            <View style={styles.shadowedUnderline} />

            <TaskAttachments
              linkData={linkData}
              linkName={linkName}
              setLinkData={setLinkData}
              setLinkName={setLinkName}
              addLinks={addLinks}
              removeLinks={removeLinks}
              dispatch={dispatch}
              links={links}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 13,
              }}
            >
              <CustomButton
                label="Cancel"
                buttonStyle={styles.buttonStyle}
                textButtonStyle={styles.textButtonStyle}
                action={() => setModalVisible(false)}
                underlayColor="#5884CD"
              />
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{}} />
              ) : (
                <CustomButton
                  label="Create"
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: "#002594" },
                  ]}
                  textButtonStyle={styles.textButtonStyle}
                  underlayColor="#5884CD"
                  action={createTask}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  scrollContainer: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: "#1B57B8",
  },
  line: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: {
      height: 7,
      width: 0,
    },
  },
  header: {
    fontFamily: "Lexend-SemiBold",
    alignSelf: "center",
    fontSize: 21,
    color: "#fff",
  },
  underLine: {
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#ccc",
    margin: 15,
    marginTop: 9,
    width: 250,
  },
  text: {
    fontSize: 15,
    fontFamily: "Lexend-Medium",
    color: "white",
    marginLeft: 13,
    marginBottom: -3,
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: "#A1A1A1",
    backgroundColor: "white",
    borderRadius: 12,
    width: 380,
    paddingLeft: 15,
    margin: 13,
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
  shadowedUnderline: {
    borderWidth: 1.3,
    alignSelf: "stretch",
    borderColor: "#0447B3",
    marginTop: 30,
    marginBottom: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
  dateInputStyle: {
    marginTop: 15,
    marginBottom: 15,
    width: 380,
    paddingLeft: 15,
    margin: 10,
  },
});

export default NewTaskScreen;
