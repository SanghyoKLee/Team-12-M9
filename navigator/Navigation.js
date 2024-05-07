import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ConfirmEmail from "../screens/ConfirmEmail";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import TabNavigator from "./TabNavigator";
import FocusedPost from "../screens/FocusedPost";
import FocusedReview from "../screens/FocusedReview";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator from "./DrawerNavigator";
import EditProfile from "../screens/EditProfile";
import { ProfileDataProvider } from "../contexts/ProfileDataContext"; // Import ProfileDataProvider
import PersonalMessage from "../screens/PersonalMessage";
import Archive from "../screens/Archive";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <ProfileDataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="FocusedPost" component={FocusedPost} />
          <Stack.Screen name="FocusedReview" component={FocusedReview} />
          <Stack.Screen name="TabNavigator" component={DrawerNavigator} />
          <Stack.Screen name="Archive" component={Archive} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="PersonalMessage" component={PersonalMessage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileDataProvider>
  );
};

export default Navigation;
