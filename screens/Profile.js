import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNavigation from "../navigator/ProfileNavigation";

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader />
      <View style={{ flex: 1, marginTop: -150 }}>
        <ProfileNavigation />
      </View>
    </View>
  );
};

export default Profile;
