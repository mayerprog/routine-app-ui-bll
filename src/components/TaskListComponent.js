import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const TaskListItem = ({
  task,
  simultaneousHandlers,
  setScrollEnabled,
  removeTasks,
}) => {
  const [height, setHeight] = useState();
  const dispatch = useDispatch();

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(height);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
  const SCROLLING_THRESHOLD = SCREEN_WIDTH * 0.001;

  const handleRemoveTask = () => {
    dispatch(removeTasks(task._id));
  };

  const panGesture = useAnimatedGestureHandler({
    // the hook that helps to handle every type of gesture
    onActive: (event) => {
      translateX.value = withTiming(event.translationX, { duration: 50 });
      //when panGesture is active, we will store event.translationX value in translateX.value
      if (
        translateX.value < -SCROLLING_THRESHOLD ||
        translateX.value > SCROLLING_THRESHOLD
      ) {
        runOnJS(setScrollEnabled)(false);
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && removeTasks) {
            runOnJS(handleRemoveTask)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
      if (
        translateX.value > -SCROLLING_THRESHOLD ||
        translateX.value < SCROLLING_THRESHOLD
      ) {
        runOnJS(setScrollEnabled)(true);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < -SCREEN_WIDTH * 0.1 ? 1 : 0);
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.task, rTaskContainerStyle]}
      onLayout={({ nativeEvent }) => {
        const { height } = nativeEvent.layout;
        setHeight(height);
      }}
    >
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5 name="trash-alt" size={40} color="red" />
      </Animated.View>
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
    </Animated.View>
  );
};

const TaskListComponent = ({ tasks, setModalVisible, removeTasks }) => {
  const scrollRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        ref={scrollRef}
        scrollEnabled={scrollEnabled}
      >
        {tasks.map((task, index) => (
          <TaskListItem
            task={task}
            key={task._id}
            simultaneousHandlers={scrollRef}
            setScrollEnabled={setScrollEnabled}
            removeTasks={removeTasks}
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
    // marginVertical: 5,
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
