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
  View,
} from "react-native";
import {
  addInTaskLinks,
  removeLinks,
  addLinks,
} from "../redux/slices/taskSlice";
import ChooseTimeComponent from "../components/ChooseTimeComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/slices/taskSlice";
import { tasksAPI } from "../api/tasksAPI";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalAddLinks from "../components/ModalAddLinks";

const InTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const links = useSelector((state) => state.task.links);
  const [selectedDate, setSelectedDate] = useState("");

  let updatedTask = { ...task, links: [...task.links] }; //deep copy

  useEffect(() => {
    dispatch(addInTaskLinks(task.links));
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
    setLoading(true);
    updatedTask.title = title;
    updatedTask.description = description;
    updatedTask.links = links;
    updatedTask.date = selectedDate;
    dispatch(editTask(updatedTask));
    await tasksAPI.updateTask(task._id, updatedTask);
    navigation.goBack();
    setLoading(false);
  };

  return (
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
            onChangeText={(taskDescription) => setDescription(taskDescription)}
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
          <Text style={styles.nothingAddedText}>No Media added</Text>
        </View>

        <View style={[styles.contentContainer, { zIndex: 1000 }]}>
          <Text style={styles.labelText}>When?</Text>
          <View style={styles.shadowedUnderline} />
          <View style={{ marginTop: 15 }}>
            <ChooseTimeComponent
              setSelectedDate={setSelectedDate}
              dropDownDirection="BOTTOM"
              placeholderValue={task.date}
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

const InTaskLinks = ({ links, checkIfURLCanBeOpened, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkData, setLinkData] = useState("");
  const [linkName, setLinkName] = useState("");

  const handleRemoveItem = (linkIdToRemove) => {
    dispatch(removeLinks(linkIdToRemove));
  };
  return (
    <View style={{ flex: 1 }}>
      {links.length ? (
        links.map((link, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingStart: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => handleRemoveItem(link._id)}
              hitSlop={7}
              style={{
                alignSelf: "flex-end",
                marginEnd: 30,
                marginBottom: -3,
              }}
            >
              <MaterialIcons name="cancel" size={23} color="#ccc" />
            </TouchableOpacity>
            <AntDesign
              name="link"
              size={17}
              color="#474B57"
              style={{ alignSelf: "flex-end", marginEnd: 10 }}
            />
            <TouchableOpacity
              onPress={() => checkIfURLCanBeOpened(link.link)}
              hitSlop={{ top: 10, bottom: 10, left: 45, right: 45 }}
            >
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.nothingAddedText}>{"No Links added"}</Text>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ModalAddLinks
            dispatch={dispatch}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            addLinks={addLinks}
            linkData={linkData}
            linkName={linkName}
            setLinkData={setLinkData}
            setLinkName={setLinkName}
          />
        </View>
      </Modal>
      <View style={styles.addIconStyle}>
        <TouchableOpacity onPress={() => setModalVisible(true)} hitSlop={45}>
          <Ionicons name="add-circle-sharp" size={45} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  addIconStyle: {
    marginTop: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
    flex: 1,
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
  linkText: {
    fontSize: 17,
    marginTop: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  textInputStyle: {
    borderRadius: 30,
    width: 200,
  },
});

export default InTaskScreen;
