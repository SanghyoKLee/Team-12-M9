import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navigation from "./navigator/Navigation";
import { ProfileDataContext, ProfileDataProvider } from './contexts/ProfileDataContext';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigator/TabNavigator";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <UserProvider>
      <ProfileDataProvider>
      <Navigation />
      </ProfileDataProvider>
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f9fbfc",
  },
  tabBar: {
    backgroundColor: "#6bc2be",
  },
});
