import {
  ActivityIndicator,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChooseTimeComponent from "../components/ChooseTimeComponent";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/slices/taskSlice";
import { tasksAPI } from "../api/tasksAPI";

const InTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let updatedTask = { ...task, links: [...task.links] };

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
    setLoading(true);
    updatedTask.title = title;
    updatedTask.description = description;
    dispatch(editTask(updatedTask));
    await tasksAPI.updateTask(task._id, updatedTask);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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
            onChangeText={(taskDescription) => setDescription(taskDescription)}
          />
        </View>

        {/* create reused component if necessary */}
        <View style={styles.contentContainer}>
          <Text style={styles.labelText}>Links</Text>
          <View style={styles.shadowedUnderline} />
          {task.links.length ? (
            task.links.map((link) => (
              <TouchableOpacity
                onPress={() => checkIfURLCanBeOpened(link.link)}
                key={link._id}
              >
                <Text style={styles.linkText}>{link.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.nothingAddedText}>{"No Links added"}</Text>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.labelText}>Media</Text>
          <View style={styles.shadowedUnderline} />
          <Text style={styles.nothingAddedText}>No Media added</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.labelText}>When?</Text>
          <View style={styles.shadowedUnderline} />
          <Text style={styles.nothingAddedText}>{task.date}</Text>
          {/* When being edited <ChooseTimeComponent /> must come up */}
          {/* <ChooseTimeComponent /> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 30,
          }}
        >
          <CustomButton
            label="Cancel"
            buttonStyle={styles.buttonStyle}
            textButtonStyle={styles.textButtonStyle}
            action={() => navigation.goBack()}
            underlayColor="#5884CD"
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{}} />
          ) : (
            <CustomButton
              label="Save"
              buttonStyle={[styles.buttonStyle, { backgroundColor: "#D1E0F9" }]}
              textButtonStyle={[styles.textButtonStyle, { color: "#5884CD" }]}
              underlayColor="#002594"
              action={updateTask}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingVertical: 13,
    alignSelf: "center",
  },
  contentContainer: {
    justifyContent: "flex-start",
    marginVertical: 15,
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
  linkText: {
    alignSelf: "center",
    fontSize: 17,
    marginTop: 10,
    textDecorationLine: "underline",
    color: "#1B57B8",
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
});

export default InTaskScreen;
