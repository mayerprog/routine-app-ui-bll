import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";

const TaskComponent = () => {
  const handleDoubleTap = () => {
    console.log("task opened");
  };

  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleDoubleTap();
          }
        }}
        numberOfTaps={2}
        style={styles.taskContainer}
      >
        <View style={styles.taskContainer}>
          <Text
            style={[
              styles.text,
              { fontSize: 16, fontFamily: "Lexend-SemiBold" },
            ]}
          >
            Back exercise
          </Text>
          <Text style={styles.text}>
            Good back exercise for everyday training
          </Text>
          <View style={styles.shadowedUnderline} />

          <Text style={styles.text}>Everyday</Text>
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#4676C5",
    borderColor: "#1B57B8",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: 370,
    alignSelf: "center",
    alignItems: "stretch",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    margin: 3,
  },
  shadowedUnderline: {
    borderWidth: 0.5,
    borderColor: "#0447B3",
    marginTop: 15,
    marginBottom: 5,
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

export default TaskComponent;
