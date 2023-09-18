import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";

const NewTaskScreen = ({ setModalVisible }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Every day", value: "everyday" },
    { label: "Every week", value: "everyweek" },
    { label: "Every weekday", value: "everyweekday" },
    { label: "Every weekend", value: "everyweekend" },
    { label: "Other", value: "other" },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.taskContainer}>
        {/* <View style={styles.line}>
          <View style={styles.linesStyle} />
        </View> */}

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
                onChangeText={() => console.log("clicked")}
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
                onChangeText={() => console.log("clicked")}
              />
            </View>

            <>
              <Text style={styles.text}>When?</Text>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Choose the time"
                style={[styles.textInput, { height: 50 }]}
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
            </>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  taskContainer: {
    flex: 1,
    alignItems: "center",
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
    width: 130,
    height: 45,
    backgroundColor: "#4676C5",
    paddingVertical: 13,
  },
  textButtonStyle: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
});

export default NewTaskScreen;
