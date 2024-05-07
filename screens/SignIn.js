import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import LogoImg from "../assets/images/RedBook.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUserId } = useUser();

  const onSignInPressed = async () => {
    const userData = await signIn(username, password);
    if (userData) {
      setUserId(userData.id); // Set the user ID in context
      navigation.navigate("TabNavigator");
    } else {
      // Handle sign-in failure
      console.error("Failed to sign in");
    }
  };

  const signIn = async (username, password) => {
    //  API call here
    return { id: "12345", username: username };
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  const { height } = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={LogoImg}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder={"Username"}
          value={username}
          setValue={setUsername}
        />

        <CustomInput
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton onPress={onSignInPressed} text="Sign In" />

        <CustomButton
          onPress={onForgotPasswordPressed}
          text="Forgot password?"
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          onPress={onSignUpPress}
          text="Don't have an account? Sign up"
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  logo: {
    width: "25%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
