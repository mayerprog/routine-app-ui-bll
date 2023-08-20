import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="date-range" size={17} style={styles.iconStyle} />
      <View>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            maximumDate={new Date("2023-1-1")}
            minimumDate={new Date("1930-1-1")}
            style={styles.datePicker}
          />
        )}
        {showPicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: "#11182711" },
              ]}
              onPress={toggleDatePicker}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: "#21A098" },
              ]}
              onPress={confirmIOSDate}
            >
              <Text style={(styles.buttonText, { color: "white" })}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              placeholder="Date of birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              editable={false}
              onPressIn={toggleDatePicker}
              style={{ marginTop: 6 }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 25,
  },
  iconStyle: {
    marginRight: 5,
    paddingTop: 6,
    paddingBottom: 3,
    color: "grey",
    marginBottom: 2,
  },
  input: {
    flex: 1,
    color: "#ccc",
    marginTop: 6,
  },
  datePicker: {
    height: 150,
    marginTop: -10,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 50,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#075985",
  },
});

export default DatePicker;
