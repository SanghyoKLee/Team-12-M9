import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PersonalMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Personal Message</Text>
    </View>
  );
};

export default PersonalMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
  },
});
