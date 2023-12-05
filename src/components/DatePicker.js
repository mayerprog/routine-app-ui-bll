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
import moment from "moment/moment";

const DatePicker = ({
  valueDate,
  dateAction,
  displayType,
  datePickerHeight,
  dateInputStyle,
  placeholderTextColor,
  placeholder,
  iconColor,
  mode,
  cancelButtonColor,
  maximumDate,
  minimumDate,
  setDateForDisplay,
}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        dateAction(currentDate.toDateString());
      }
    }
    // else {
    //   toggleDatePicker();
    // }
  };

  const confirmIOSDate = () => {
    let resDate;
    if (mode === "datetime") resDate = moment(date).format("YYYY-MM-DDTHH:mm");
    else resDate = moment(date).format("YYYY-MM-DD");
    setDateForDisplay(new Date(date).toLocaleString().slice(0, 17));

    dateAction(resDate);
    toggleDatePicker();
  };

  return (
    <View style={[styles.container, dateInputStyle]}>
      <MaterialIcons
        name="date-range"
        size={17}
        style={[styles.iconStyle, { color: iconColor }]}
      />
      <View>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode={mode}
            display={displayType}
            onChange={onChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            style={[styles.datePicker, { height: datePickerHeight }]}
          />
        )}
        {showPicker && Platform.OS === "ios" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 15,
            }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: cancelButtonColor }]}
              onPress={toggleDatePicker}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#21A098" }]}
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
              placeholder={placeholder}
              value={valueDate}
              editable={false}
              onPressIn={toggleDatePicker}
              placeholderTextColor={
                placeholderTextColor ? placeholderTextColor : null
              }
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
    marginBottom: 2,
  },
  input: {
    flex: 1,
    color: "#ccc",
    marginTop: 6,
  },
  datePicker: {
    marginTop: -10,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#075985",
  },
});

export default DatePicker;
