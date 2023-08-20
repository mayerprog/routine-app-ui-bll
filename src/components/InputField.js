import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const InputField = ({ label, icon, inputType, keyboardType }) => {
  return (
    <View style={styles.form}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          style={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          style={styles.input}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    paddingVertical: 1,
  },
});

export default InputField;
