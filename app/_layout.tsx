import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
// import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import ApolloSetup from "./ApolloSetup";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import { Appearance } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // const colorScheme2 = Appearance.getColorScheme();
  const [loaded] = useFonts({
    SharpSansNo1: require("../assets/fonts/SharpSansNo1-Medium.ttf"),
    SharpSansBold: require("../assets/fonts/SharpSansBold.ttf"),
  });

  // Appearance.setColorScheme("dark");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <ApolloSetup>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ApolloSetup>
      </AuthProvider>
    </ThemeProvider>
  );
}
