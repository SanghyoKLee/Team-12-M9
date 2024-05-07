import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmail = () => {
  const [code, setCode] = useState("");
  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate("TabNavigator");
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onResendPressed = () => {
    console.warn("onResendPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          placeholder={"Confirmation code"}
          value={code}
          setValue={setCode}
        />

        <CustomButton
          text="Confirm"
          onPress={onConfirmPressed}
          marginTop={15}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPressed}
          type="SECONDARY"
          marginTop={15}
        />

        <CustomButton
          text="Back to sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: { color: "#FDB075" },
});
