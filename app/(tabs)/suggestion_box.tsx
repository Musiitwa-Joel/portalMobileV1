import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Professional design constants
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const FONT = {
  regular:
    Platform.select({ ios: "SF Pro Text", android: "Roboto" }) || "System",
  medium:
    Platform.select({ ios: "SF Pro Text-Medium", android: "Roboto-Medium" }) ||
    "System",
  semibold:
    Platform.select({ ios: "SF Pro Text-Semibold", android: "Roboto-Bold" }) ||
    "System",
  bold:
    Platform.select({ ios: "SF Pro Display-Bold", android: "Roboto-Bold" }) ||
    "System",
};

export default function SuggestionBoxScreen() {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const isDark = colorScheme === "dark";

  // Professional theme colors
  const theme = {
    background: isDark ? "#121212" : "#f8f9fa",
    card: isDark ? "#1e1e1e" : "#ffffff",
    text: isDark ? "#e0e0e0" : "#2d3748",
    textSecondary: isDark ? "#a0aec0" : "#718096",
    placeholderText: isDark ? "#4a5568" : "#a0aec0",
    primary: "#1a7de7",
    primaryLight: isDark ? "#2d3748" : "#e6f0fd",
    primaryDark: "#1565c0",
    border: isDark ? "#2d3748" : "#e2e8f0",
    inputBg: isDark ? "#2d3748" : "#f7fafc",
    success: "#38b2ac",
    error: "#e53e3e",
    shadow: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = () => {
    if (suggestion.trim().length < 10) {
      return;
    }

    // Here you would typically send the suggestion to your backend
    console.log("Submitting suggestion:", suggestion);

    // Show success state with animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSubmitted(true);
    });

    // Reset after 4 seconds
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSubmitted(false);
        setSuggestion("");

        // Fade back in the form
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
  };

  const characterCount = suggestion.length;
  const maxCharacters = 500;
  const isValid = suggestion.trim().length >= 10;
  const isNearLimit = characterCount > maxCharacters * 0.8;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {!submitted ? (
            <>
              <View style={styles.header}>
                <Text
                  style={[
                    styles.title,
                    { color: theme.text, fontFamily: FONT.bold },
                  ]}
                >
                  Feedback
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    { color: theme.textSecondary, fontFamily: FONT.regular },
                  ]}
                >
                  We value your input to improve our services
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.text, fontFamily: FONT.medium },
                  ]}
                >
                  Your Suggestion
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: focused ? theme.primary : theme.border,
                      backgroundColor: theme.inputBg,
                    },
                    focused && {
                      shadowColor: theme.primary,
                      shadowOpacity: 0.2,
                    },
                  ]}
                >
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        fontFamily: FONT.regular,
                      },
                    ]}
                    placeholder="Share your thoughts or ideas with us..."
                    placeholderTextColor={theme.placeholderText}
                    value={suggestion}
                    onChangeText={setSuggestion}
                    multiline
                    maxLength={maxCharacters}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                </View>

                <View style={styles.inputFooter}>
                  <Text
                    style={[
                      styles.helperText,
                      {
                        color:
                          !isValid && suggestion.length > 0
                            ? theme.error
                            : theme.textSecondary,
                        fontFamily: FONT.regular,
                      },
                    ]}
                  >
                    {!isValid && suggestion.length > 0
                      ? "Minimum 10 characters required"
                      : "Be specific and constructive"}
                  </Text>

                  <Text
                    style={[
                      styles.counter,
                      {
                        color: isNearLimit ? theme.error : theme.textSecondary,
                        fontFamily: FONT.regular,
                      },
                    ]}
                  >
                    {characterCount}/{maxCharacters}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: theme.primary },
                  !isValid && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isValid}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: FONT.semibold }]}
                >
                  Submit Feedback
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.disclaimer,
                  { color: theme.textSecondary, fontFamily: FONT.regular },
                ]}
              >
                Your feedback helps us improve our product and services. Thank
                you for your contribution.
              </Text>
            </>
          ) : (
            <View style={styles.successContainer}>
              <View
                style={[
                  styles.successIconContainer,
                  { backgroundColor: theme.primaryLight },
                ]}
              >
                <View
                  style={[
                    styles.successIcon,
                    { backgroundColor: theme.success },
                  ]}
                >
                  <Text style={styles.successIconText}>✓</Text>
                </View>
              </View>

              <Text
                style={[
                  styles.successTitle,
                  { color: theme.text, fontFamily: FONT.bold },
                ]}
              >
                Thank You for Your Feedback
              </Text>

              <Text
                style={[
                  styles.successMessage,
                  { color: theme.textSecondary, fontFamily: FONT.regular },
                ]}
              >
                We've received your suggestion and will review it shortly. Your
                input is valuable to us.
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = Math.min(width - SPACING.lg * 2, 500);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    padding: SPACING.xl,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0,
    shadowRadius: 16,
    elevation: 0,
  },
  input: {
    padding: SPACING.md,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
    lineHeight: 24,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  helperText: {
    fontSize: 13,
  },
  counter: {
    fontSize: 13,
  },
  button: {
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 13,
    textAlign: "center",
    marginTop: SPACING.xl,
    lineHeight: 18,
  },
  successContainer: {
    alignItems: "center",
    padding: SPACING.lg,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  successIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  successIconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  successMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
