import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  backgroundColor,
  foregroundColor,
  width = "100%",
  height = 50,
  marginTop = 0,
  marginBottom = 0,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        backgroundColor ? { backgroundColor: backgroundColor } : {},
        {
          width: width,
          height: height,
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          foregroundColor ? { color: foregroundColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },
  text_TERTIARY: {
    color: "gray",
  },
});
