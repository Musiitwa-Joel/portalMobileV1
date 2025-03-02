import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StudentRegistrationScreen from "../../components/Registration/Registration";
import RegistrationTrack from "../../components/Registration/RegistrationTrack";
import { useColorScheme, StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function RegistrationTabs() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const theme = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
    activeTintColor: isDarkMode ? "#4faaff" : "#1a7de7",
    inactiveTintColor: isDarkMode ? "#888" : "gray",
    indicatorColor: isDarkMode ? "#4faaff" : "#1a7de7",
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.activeTintColor,
        tabBarInactiveTintColor: theme.inactiveTintColor,
        tabBarIndicatorStyle: { backgroundColor: theme.indicatorColor },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          fontFamily: "SharpSansBold",
        },
        tabBarStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Tab.Screen name="Registration" component={StudentRegistrationScreen} />
      <Tab.Screen name="Registration Track" component={RegistrationTrack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
