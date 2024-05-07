import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import Campus from "../screens/Campus";
import Create from "../screens/Create";
import Inbox from "../screens/Inbox";
import Notifications from "../screens/Notifications";
import Messages from "../screens/Messages";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#071E22",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          headerStyle: styles.tabHeader,
        }}
      />
      <Tab.Screen
        name="Campus"
        component={Campus}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={20} color={color} />
          ),
          headerStyle: styles.tabHeader,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        initialParams={{ defaultMode: "review" }}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={20} color={color} />
          ),
          headerStyle: styles.tabHeader,
          listeners: {
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Determine the mode based on the last active route
              const lastRouteName =
                navigation.getState().routes[navigation.getState().index - 1]
                  ?.name;
              const mode = lastRouteName === "Home" ? "review" : "post";
              navigation.navigate("Create", { formType: mode });
            },
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={20} color={color} />
          ),
          headerStyle: styles.tabHeader,
          tabBarBadge: 3,
          tabBarBadgeStyle: styles.tabBarBadge,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={20} color={color} />
          ),
          headerStyle: styles.tabHeader,
          tabBarBadge: 5,
          tabBarBadgeStyle: styles.tabBarBadge,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#83d4d0",
  },
  tabHeader: {
    backgroundColor: "#fafafa",
  },
  tabBarBadge: {
    backgroundColor: "red",
  },
});
