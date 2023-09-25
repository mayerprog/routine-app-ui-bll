import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setDescription,
  setLink,
  setLinkName,
  addLinks,
} from "../redux/slices/taskSlice";

import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";
import MediaAttachments from "../components/MediaAttachments";

const NewTaskScreen = ({ setModalVisible }) => {
  const [open, setOpen] = useState(false);
  const title = useSelector((state) => state.task.title);
  const description = useSelector((state) => state.task.description);
  const linkData = useSelector((state) => state.task.linkData);
  const linkName = useSelector((state) => state.task.linkName);
  const dispatch = useDispatch();

  return (
    <ScrollView
      style={styles.scrollContainer}
      // automaticallyAdjustKeyboardInsets={true}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
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
                onChangeText={(taskTitle) => dispatch(setTitle(taskTitle))}
              />
            </View>

            <View>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={[styles.textInput, { height: 150, paddingTop: 10 }]}
                maxLength={1000}
                multiline={true}
                placeholder="Add description..."
                placeholderTextColor="#ccc"
                value={description}
                onChangeText={(taskDescription) =>
                  dispatch(setDescription(taskDescription))
                }
              />
            </View>

            <>
              <Text style={styles.text}>When?</Text>
              <ChooseTimeComponent setOpen={setOpen} open={open} />
            </>

            <View style={styles.shadowedUnderline} />

            <MediaAttachments
              linkData={linkData}
              linkName={linkName}
              setLink={setLink}
              setLinkName={setLinkName}
              addLinks={addLinks}
              dispatch={dispatch}
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
                action={setModalVisible}
              />
              <CustomButton
                label="Create"
                buttonStyle={[
                  styles.buttonStyle,
                  { backgroundColor: "#002594" },
                ]}
                textButtonStyle={styles.textButtonStyle}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const ChooseTimeComponent = ({ setOpen, open }) => {
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Every day", value: "everyday" },
    { label: "Every week", value: "everyweek" },
    { label: "Every weekday", value: "everyweekday" },
    { label: "Every weekend", value: "everyweekend" },
    { label: "Other", value: "other" },
  ]);
  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Choose the time"
      style={[styles.textInput, { height: 50, marginBottom: 5 }]}
      placeholderStyle={{
        color: "#ccc",
        fontSize: 15,
        fontFamily: "Lexend-Regular",
      }}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      textStyle={{
        fontSize: 15,
        fontFamily: "Lexend-Regular",
        color: "#414243",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  dropDownContainerStyle: {
    borderColor: "#A1A1A1",
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
});

export default NewTaskScreen;
