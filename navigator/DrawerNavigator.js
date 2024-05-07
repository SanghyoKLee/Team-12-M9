import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Home from "../screens/Home";
import Campus from "../screens/Campus";
import Inbox from "../screens/Inbox";
import TabNavigator from "./TabNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="The Red Book"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
