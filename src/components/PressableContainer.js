import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableContainer = ({
  containerText,
  icon,
  setIconColor,
  selectItem,
  iconColorIn,
  iconColorOut,
  backgroundColor,
  shadowStyle,
}) => {
  const handlePressIn = () => {
    setIconColor(iconColorIn);
  };
  const handlePressOut = () => {
    setIconColor(iconColorOut);
  };
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Pressable
        hitSlop={10}
        style={({ pressed }) => [
          styles.pressableContainer,
          { backgroundColor: pressed ? "#21A098" : backgroundColor },
          shadowStyle,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={selectItem}
      >
        {icon}
      </Pressable>
      <Text style={styles.pressableContainerText}>{containerText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  pressableContainer: {
    width: 80,
    height: 50,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#1B57B8",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
  },
  pressableContainerText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    marginTop: 6,
  },
});

export default PressableContainer;
