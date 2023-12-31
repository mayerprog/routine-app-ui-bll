import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Google from "../assets/images/google.svg";
import Facebook from "../assets/images/facebook.svg";

const AuthGoogleFB = () => {
  return (
    <View>
      <View style={styles.line}>
        <View style={styles.linesStyle} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
        </View>
        <View style={styles.linesStyle} />
      </View>

      <View style={styles.media}>
        <TouchableOpacity
          onPress={() => console.log("oops")}
          style={styles.mediaOpacity}
        >
          <Google height={35} width={35} />
          <Text style={styles.mediaText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("oops")}
          style={styles.mediaOpacity}
        >
          <Facebook height={35} width={35} />
          <Text style={styles.mediaText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  mediaOpacity: {
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  mediaText: {
    fontFamily: "Lexend-Regular",
    color: "#7B7B7B",
    marginStart: 10,
    marginTop: 7,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default AuthGoogleFB;
