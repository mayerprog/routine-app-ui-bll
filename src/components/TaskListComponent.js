import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

const FlatListItem = ({ task, simultaneousHandlers }) => {
  const translateX = useSharedValue(0); //the value shared between js side and native side
  const panGesture = useAnimatedGestureHandler({
    // the hook that helps to handle every type of gesture
    onActive: (event) => {
      translateX.value = event.translationX; //event to scroll from right to left
      //when panGesture is active, we will store event.translationX value in translateX.value
    },
    onEnd: () => {
      translateX.value = withTiming(0); //withTiming used for animation effect
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));
  return (
    <View style={styles.task}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="trash-alt" size={50} color="red" />
      </View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={[styles.taskContainer, rStyle]}>
          <Text
            style={[
              styles.text,
              { fontSize: 16, fontFamily: "Lexend-SemiBold" },
            ]}
          >
            {task.title}
          </Text>
          <Text style={[styles.text, { marginTop: 7 }]} numberOfLines={2}>
            {task.description}
          </Text>
          <View style={styles.shadowedUnderline} />

          <Text style={styles.text}>{task.date}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const TaskListComponent = ({ tasks, setModalVisible }) => {
  const scrollRef = useRef(null);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        ref={scrollRef}
      >
        {tasks.map((task, index) => (
          <FlatListItem
            task={task}
            key={index}
            simultaneousHandlers={scrollRef}
          />
        ))}
        <View style={styles.sumIconStyle}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle" size={70} color="#1B57B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  task: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  taskContainer: {
    backgroundColor: "#4676C5",
    borderColor: "#1B57B8",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "stretch",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
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
    marginTop: 12,
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
  sumIconStyle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
    height: "30%",
  },
  iconContainer: {
    height: "100%",
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskListComponent;
