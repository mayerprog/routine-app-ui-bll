import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const CurrentDate = () => {
  const date = new Date();

  return (
    <TouchableOpacity
      onPress={() => console.log("calendar clicked")}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
      }}
    >
      <Image
        source={require("../assets/images/calendar.png")}
        style={{ height: 25, width: 25, marginTop: 12, marginRight: 15 }}
      />
      <Text style={styles.date}>{date.toDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
    color: "#6D6D6D",
  },
});

export default CurrentDate;
