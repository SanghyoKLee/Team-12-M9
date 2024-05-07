import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, Text } from "react-native";
import UserLikes from "../components/UserLikes";
import UserMedia from "../components/UserMedia";
import UserPosts from "../components/UserPosts";
import UserReviews from "../components/UserReviews";

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarLabelStyle: { fontWeight: "bold" }, // Set font weight to bold
      }}
    >
      <Tab.Screen
        name="UserPosts"
        component={UserPosts}
        options={{ title: "Posts" }}
      />
      <Tab.Screen
        name="UserReviews"
        component={UserReviews}
        options={{ title: "Reviews" }}
      />
      <Tab.Screen
        name="UserMedia"
        component={UserMedia}
        options={{ title: "Media" }}
      />
      <Tab.Screen
        name="UserLikes"
        component={UserLikes}
        options={{ title: "Likes" }}
      />
    </Tab.Navigator>
  );
};

export default ProfileNavigation;
