import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Calendar from "../assets/images/calendar.svg";

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
      <Calendar
        width={25}
        height={25}
        style={{ marginTop: 12, marginRight: 10 }}
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
