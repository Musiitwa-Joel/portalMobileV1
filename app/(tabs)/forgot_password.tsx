import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  useColorScheme,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

enum ForgotPasswordStep {
  STUDENT_NUMBER,
  VERIFICATION_CODE,
  NEW_PASSWORD,
}

interface VerificationInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  styles: ReturnType<typeof getStyles>;
}

const VerificationInput: React.FC<VerificationInputProps> = ({
  length,
  value,
  onChange,
  styles,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const isDarkMode = useColorScheme() === "dark";

  const handleChange = (text: string, index: number) => {
    const newValue = value.split("");
    newValue[index] = text;
    onChange(newValue.join(""));
    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const animatedScale = useSharedValue(0.5);

  useEffect(() => {
    animatedScale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.verificationContainer, animatedStyle]}>
      {[...Array(length)].map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.verificationInput,
            {
              backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
              color: isDarkMode ? "#FFFFFF" : "#333333",
            },
          ]}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChange(text, index)}
          value={value[index] || ""}
        />
      ))}
    </Animated.View>
  );
};

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    ForgotPasswordStep.STUDENT_NUMBER
  );
  const [studentNumber, setStudentNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();

  const styles = getStyles(isDarkMode);

  const slideAnimation = useSharedValue(0);
  const fadeAnimation = useSharedValue(0);

  useEffect(() => {
    slideAnimation.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    fadeAnimation.value = withTiming(1, { duration: 800 });
  }, [step]);

  const slideAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slideAnimation.value,
      [0, 1],
      [300, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      opacity: fadeAnimation.value,
    };
  });

  // Toast.setConfig({
  //   config: {
  //     success: (props) => (
  //       <Animated.View
  //         style={[
  //           styles.toastContainer,
  //           {
  //             transform: [
  //               {
  //                 translateY: interpolate(
  //                   fadeAnimation.value,
  //                   [0, 1],
  //                   [-100, 0],
  //                   Extrapolate.CLAMP
  //                 ),
  //               },
  //             ],
  //             opacity: fadeAnimation.value,
  //           },
  //         ]}
  //       >
  //         <Text style={[styles.toastText, { fontWeight: 'bold' }]}>{props.text1}</Text>
  //         <Text style={styles.toastText}>{props.text2}</Text>
  //       </Animated.View>
  //     ),
  //   },
  // });

  const validateStudentNumber = () => {
    if (studentNumber.length === 0) {
      setError("Student number is required");
      return false;
    }
    setError("");
    return true;
  };

  const validateVerificationCode = () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return false;
    }
    setError("");
    return true;
  };

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

  const handleStudentNumberSubmit = useCallback(() => {
    if (validateStudentNumber()) {
      // TODO: Implement API call to send verification code
      console.log("Sending verification code to email");
      setStep(ForgotPasswordStep.VERIFICATION_CODE);
      slideAnimation.value = 0;
      fadeAnimation.value = 0;
    }
  }, [studentNumber]);

  const handleVerificationCodeSubmit = useCallback(() => {
    if (validateVerificationCode()) {
      // TODO: Implement API call to verify code
      console.log("Verifying code");
      setStep(ForgotPasswordStep.NEW_PASSWORD);
      slideAnimation.value = 0;
      fadeAnimation.value = 0;
    }
  }, [verificationCode]);

  const handleNewPasswordSubmit = useCallback(() => {
    if (validatePassword()) {
      // TODO: Implement API call to update password
      console.log("Updating password");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your password has been updated successfully.",
        visibilityTime: 4000,
        topOffset: 50,
      });
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    }
  }, [newPassword, confirmPassword, validatePassword, router]);

  const renderStep = () => {
    switch (step) {
      case ForgotPasswordStep.STUDENT_NUMBER:
        return (
          <Animated.View style={slideAnimatedStyle}>
            <Text style={styles.stepText}>Step 1: Enter Student Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={24}
                color={isDarkMode ? "#CCCCCC" : "#666666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Student Number"
                placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
                value={studentNumber}
                onChangeText={setStudentNumber}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                !studentNumber && styles.disabledButton,
              ]}
              onPress={handleStudentNumberSubmit}
              disabled={!studentNumber}
            >
              <Text style={styles.submitButtonText}>
                Send Verification Code
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case ForgotPasswordStep.VERIFICATION_CODE:
        return (
          <Animated.View style={slideAnimatedStyle}>
            <Text style={styles.stepText}>Step 2: Enter Verification Code</Text>
            <Text style={styles.infoText}>
              Please check musii****@gmail.com for the verification code.
            </Text>
            <VerificationInput
              length={6}
              value={verificationCode}
              onChange={setVerificationCode}
              styles={styles}
            />
            <TouchableOpacity
              style={[
                styles.submitButton,
                verificationCode.length !== 6 && styles.disabledButton,
              ]}
              onPress={handleVerificationCodeSubmit}
              disabled={verificationCode.length !== 6}
            >
              <Text style={styles.submitButtonText}>Verify Code</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case ForgotPasswordStep.NEW_PASSWORD:
        return (
          <Animated.View style={slideAnimatedStyle}>
            <Text style={styles.stepText}>Step 3: Set New Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={isDarkMode ? "#CCCCCC" : "#666666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
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
                placeholder="Confirm New Password"
                placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!newPassword || !confirmPassword) && styles.disabledButton,
              ]}
              onPress={handleNewPasswordSubmit}
              disabled={!newPassword || !confirmPassword}
            >
              <Text style={styles.submitButtonText}>Update Password</Text>
            </TouchableOpacity>
          </Animated.View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Animated.View
              style={[styles.logoContainer, { opacity: fadeAnimation }]}
            >
              <Image
                source={require("../../assets/images/institution_logos/nkumbauni.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.Text
              style={[styles.titleText, { opacity: fadeAnimation }]}
            >
              Forgot Password
            </Animated.Text>
            {renderStep()}

            {error ? (
              <Animated.Text
                style={[styles.errorText, { opacity: fadeAnimation }]}
              >
                {error}
              </Animated.Text>
            ) : null}

            <Animated.View
              style={[styles.backToLoginContainer, { opacity: fadeAnimation }]}
            >
              <Text style={styles.backToLoginText}>
                Remember your password?{" "}
              </Text>
              <Link href="/login">
                <Text style={styles.backToLoginLink}>Log in</Text>
              </Link>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast
        config={{
          success: (props: any) => (
            <Animated.View
              style={[
                styles.toastContainer,
                {
                  transform: [
                    {
                      translateY: interpolate(
                        fadeAnimation.value,
                        [0, 1],
                        [-100, 0],
                        Extrapolate.CLAMP
                      ),
                    },
                  ],
                  opacity: fadeAnimation.value,
                },
              ]}
            >
              <Text style={[styles.toastText, { fontWeight: "bold" }]}>
                {props.text1}
              </Text>
              <Text style={styles.toastText}>{props.text2}</Text>
            </Animated.View>
          ),
        }}
      />
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
    keyboardAvoidingView: {
      flex: 1,
    },
    content: {
      padding: 20,
      justifyContent: "center",
      minHeight: "100%",
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: "center",
      minHeight: height,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    logo: {
      width: 120,
      height: 120,
    },
    titleText: {
      fontSize: 28,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      textAlign: "center",
      marginBottom: 20,
      fontFamily: "SharpSansBold",
    },
    stepText: {
      fontSize: 18,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      marginBottom: 10,
      fontFamily: "SharpSansBold",
    },
    infoText: {
      fontSize: 14,
      color: isDarkMode ? "#CCCCCC" : "#666666",
      marginBottom: 20,
      fontFamily: "SharpSansNo1",
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
    submitButton: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    disabledButton: {
      opacity: 0.5,
    },
    submitButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontFamily: "SharpSansBold",
    },
    backToLoginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    backToLoginText: {
      color: isDarkMode ? "#CCCCCC" : "#666666",
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    backToLoginLink: {
      color: "#007AFF",
      fontSize: 16,
      fontFamily: "SharpSansBold",
    },
    errorText: {
      color: "#FF3B30",
      fontSize: 14,
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "SharpSansNo1",
    },
    verificationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    verificationInput: {
      width: 40,
      height: 50,
      borderWidth: 1,
      borderColor: isDarkMode ? "#333333" : "#E0E0E0",
      borderRadius: 8,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "SharpSansNo1",
    },
    toastContainer: {
      backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
      borderLeftColor: "#007AFF",
      borderLeftWidth: 5,
      padding: 16,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    toastText: {
      color: isDarkMode ? "#FFFFFF" : "#333333",
      fontSize: 14,
      fontFamily: "SharpSansNo1",
    },
  });
};
