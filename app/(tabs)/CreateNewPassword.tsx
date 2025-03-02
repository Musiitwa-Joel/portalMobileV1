import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function CreateNewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const slideAnimation = useSharedValue(0);
  const fadeAnimation = useSharedValue(0);

  useEffect(() => {
    slideAnimation.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    fadeAnimation.value = withTiming(1, { duration: 800 });
  }, []);

  const slideAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(slideAnimation.value * 0, { damping: 15 }) },
      ],
      opacity: fadeAnimation.value,
    };
  });

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validatePassword()) {
      // Handle password update
      router.push("/");
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        ></TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, slideAnimatedStyle]}>
        <Text style={styles.title}>Create New Password</Text>

        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-open" size={40} color="#1a7de7" />
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
          </View>
        </View>

        <Text style={styles.description}>
          Your new password must different from previous used password
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={isDarkMode ? "#CCCCCC" : "#666666"}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={isDarkMode ? "#CCCCCC" : "#666666"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={isDarkMode ? "#CCCCCC" : "#666666"}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={isDarkMode ? "#CCCCCC" : "#666666"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {error ? (
          <Animated.Text style={[styles.errorText, { opacity: fadeAnimation }]}>
            {error}
          </Animated.Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!newPassword || !confirmPassword) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!newPassword || !confirmPassword}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) => {
  const { width, height } = Dimensions.get("window");
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF",
    },
    header: {
      paddingHorizontal: 16,
      height: 56,
      justifyContent: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 28,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      textAlign: "center",
      marginBottom: 32,
      fontFamily: "SharpSansBold",
    },
    iconContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: isDarkMode ? "#2A2A2A" : "#EDF3FF",
      justifyContent: "center",
      alignItems: "center",
    },
    checkmarkContainer: {
      position: "absolute",
      bottom: 8,
      right: 8,
      backgroundColor: "#1a7de7",
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? "#CCCCCC" : "#666666",
      textAlign: "center",
      marginBottom: 32,
      paddingHorizontal: 24,
      fontFamily: "SharpSansNo1",
    },
    inputContainer: {
      marginBottom: 32,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDarkMode ? "#333333" : "#E0E0E0",
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      fontFamily: "SharpSansNo1",
    },
    eyeIcon: {
      padding: 10,
    },
    errorText: {
      color: "#FF3B30",
      fontSize: 14,
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "SharpSansNo1",
    },
    submitButton: {
      backgroundColor: "#1a7de7",
      borderRadius: 8,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontFamily: "SharpSansBold",
    },
  });
};
