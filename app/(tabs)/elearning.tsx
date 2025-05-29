"use client";

import { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewProps } from "react-native-webview";
import { Feather } from "@expo/vector-icons";

interface ELearningProps {
  url?: string;
  loadingTitle?: string;
}

export default function ELearning({
  url = "https://elearning.nkumbauniversity.ac.ug/",
  loadingTitle = "Loading E-Learning Portal",
}: ELearningProps) {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(false);

  // Get the user's color scheme preference (light or dark)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Define colors based on the color scheme
  const colors = {
    background: isDarkMode ? "#121212" : "#ffffff",
    loaderBackground: isDarkMode ? "#1e1e1e" : "#f5f5f5",
    cardBackground: isDarkMode ? "#2a2a2a" : "#ffffff",
    primaryText: isDarkMode ? "#ffffff" : "#333333",
    secondaryText: isDarkMode ? "#b0b0b0" : "#666666",
    accent: "#0056b3", // Keep accent color consistent for brand identity
    error: "#d32f2f",
    progressBackground: isDarkMode ? "#3a3a3a" : "#e0e0e0",
  };

  // Use the correct type for the progress event
  const handleLoadProgress: WebViewProps["onLoadProgress"] = ({
    nativeEvent,
  }) => {
    setLoadingProgress(nativeEvent.progress);
  };

  const handleLoadEnd: WebViewProps["onLoadEnd"] = () => {
    setLoading(false);
  };

  const handleError: WebViewProps["onError"] = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {loading && (
        <View
          style={[
            styles.loaderContainer,
            { backgroundColor: colors.loaderBackground },
          ]}
        >
          <View
            style={[styles.loader, { backgroundColor: colors.cardBackground }]}
          >
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={[styles.loaderText, { color: colors.primaryText }]}>
              {loadingTitle}
            </Text>
            <View
              style={[
                styles.progressContainer,
                { backgroundColor: colors.progressBackground },
              ]}
            >
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${loadingProgress * 100}%`,
                    backgroundColor: colors.accent,
                  },
                ]}
              />
            </View>
            <Text
              style={[styles.progressText, { color: colors.secondaryText }]}
            >
              {Math.round(loadingProgress * 100)}%
            </Text>
          </View>
        </View>
      )}

      {error ? (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Feather name="wifi-off" size={50} color={colors.error} />
          <Text style={[styles.errorTitle, { color: colors.error }]}>
            Connection Error
          </Text>
          <Text style={[styles.errorText, { color: colors.secondaryText }]}>
            Unable to connect to the e-learning portal. Please check your
            internet connection and try again.
          </Text>
        </View>
      ) : (
        <WebView
          source={{ uri: url }}
          style={[styles.webview, loading ? styles.hidden : undefined]}
          onLoadProgress={handleLoadProgress}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => <View />} // We're using our custom loader
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loader: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
  },
  loaderText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  progressContainer: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    marginTop: 15,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "SharpSansBold",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "SharpSansNo1",
  },
});
