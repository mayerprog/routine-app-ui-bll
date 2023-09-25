import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/onboardImage.jpg")}
        style={styles.backgroundImage}
      >
        <Image
          source={require("../assets/images/login-quote.png")}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.appButtonContainer}
          activeOpacity={0.9}
        >
          <Text style={styles.appButtonText}>Start</Text>
        </TouchableOpacity>
      </Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    contentFit: "cover", // To scale the image to cover the entire background
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  image: {
    height: 250,
    width: 250,
  },
  appButtonContainer: {
    elevation: 10,
    backgroundColor: "#A3DAEB",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 330,
    marginBottom: 170,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  appButtonText: {
    fontSize: 18,
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
  },
});

export default OnboardingScreen;
