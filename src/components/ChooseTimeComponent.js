import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const ChooseTimeComponent = ({
  setSelectedDate,
  dropDownDirection,
  dropDownMargin,
  placeholderValue,
}) => {
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Every day", value: "everyday" },
    { label: "Every weekday", value: "everyweekday" },
    { label: "Every weekend", value: "everyweekend" },
    { label: "Once", value: "once" },
    { label: "Other", value: "other" },
  ]);
  const [open, setOpen] = useState(false);

  const handleSelectDate = (date) => {
    setSelectedDate(date.label);
  };

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      dropDownDirection={dropDownDirection}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholderValue}
      style={[styles.textInput, { height: 50, marginBottom: 5 }]}
      placeholderStyle={{
        color: "#404040",
        fontSize: 15,
        fontFamily: "Lexend-Regular",
      }}
      dropDownContainerStyle={[
        styles.dropDownContainerStyle,
        { margin: dropDownMargin },
      ]}
      onSelectItem={handleSelectDate}
      textStyle={{
        fontSize: 15,
        fontFamily: "Lexend-Regular",
        color: "#414243",
      }}
    />
  );
};

const styles = StyleSheet.create({
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
    alignSelf: "center",
  },
  dropDownContainerStyle: {
    borderColor: "#A1A1A1",
    borderRadius: 12,
    width: 380,
    paddingLeft: 15,
    alignSelf: "center",
  },
});

export default ChooseTimeComponent;
