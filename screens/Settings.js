import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  // Function to handle signing out
  const handleSignOut = () => {
    // Navigate to the login screen
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFDD0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
