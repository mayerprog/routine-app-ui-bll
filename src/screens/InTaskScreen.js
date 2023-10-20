import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChooseTimeComponent from "../components/ChooseTimeComponent";

const InTaskScreen = ({ route }) => {
  const { task } = route.params;

  const checkIfURLCanBeOpened = async (url) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        alert(`The URL cannot be opened.`);
      }
    } catch (error) {
      console.error("Error checking if URL can be opened: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          marginEnd: 20,
        }}
        onPress={() => console.log("edit the task")}
      >
        <Text style={{ fontFamily: "Roboto-Medium", color: "#1B57B8" }}>
          Edit
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.textStyle,
          { fontFamily: "Roboto-Medium", fontSize: 24 },
        ]}
      >
        {task.title}
      </Text>
      <Text style={styles.textStyle}>{task.description}</Text>
      {/* make reused component! */}
      <View style={styles.contentContainer}>
        <Text
          style={{ alignSelf: "center", color: "#6A6A6A", marginBottom: 5 }}
        >
          Links
        </Text>
        <View style={styles.shadowedUnderline} />
        {task.links.length ? (
          task.links.map((link) => (
            <TouchableOpacity
              onPress={() => checkIfURLCanBeOpened(link.link)}
              key={link._id}
            >
              <Text
                style={{ alignSelf: "center", fontSize: 20, marginTop: 10 }}
              >
                {link.name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ alignSelf: "center", marginTop: 10 }}>
            {"No Links added"}
          </Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={{ alignSelf: "center", color: "#6A6A6A", marginBottom: 5 }}
        >
          Media
        </Text>
        <View style={styles.shadowedUnderline} />
        <Text style={{ alignSelf: "center", color: "#6A6A6A", marginTop: 10 }}>
          No Media added
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={{ alignSelf: "center", color: "#6A6A6A", marginBottom: 5 }}
        >
          When?
        </Text>
        <View style={styles.shadowedUnderline} />
        <Text style={{ alignSelf: "center", marginTop: 10 }}>Every day</Text>
        {/* When being edited <ChooseTimeComponent /> must come up */}
        {/* <ChooseTimeComponent /> */}
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
  infoContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingVertical: 15,
    alignSelf: "center",
  },
  contentContainer: {
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  shadowedUnderline: {
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
});

export default InTaskScreen;
