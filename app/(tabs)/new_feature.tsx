import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { FormData, ThemeColors } from "@/types/schedule";
import { lightTheme, darkTheme } from "@/types/theme";
import Toast from "react-native-toast-message";

export default function CourseChangeForm({ navigation }: { navigation: any }) {
  const colorScheme = useColorScheme();
  const theme: ThemeColors = colorScheme === "dark" ? darkTheme : lightTheme;

  const [formData, setFormData] = useState<FormData>({
    program: "",
    reason: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your submission logic here
    Toast.show({
      type: "success",
      text1: "Request Submitted",
      text2: "Your feature request has been submitted successfully.",
    });
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },
    backButton: {
      color: "#007AFF",
      fontSize: 17,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "600",
      color: theme.text,
      marginRight: 40, // To offset the back button and center the title
    },
    title: {
      fontSize: 20,
      // fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    subtitle: {
      fontSize: 17,
      color: theme.text,
      marginBottom: 24,
      opacity: 0.7,
      fontFamily: "SharpSansNo1",
    },
    formGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 17,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansNo1",
    },
    required: {
      color: "#FF3B30",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
      backgroundColor: theme.background,
      height: 120,
      textAlignVertical: "top",
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    largeInput: {
      height: 60,
    },
    submitButton: {
      backgroundColor: "#007AFF",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 32,
      marginBottom: Platform.OS === "ios" ? 32 : 16,
    },
    submitText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "600",
      fontFamily: "SharpSansNo1",
    },
  });

  const renderFormField = (
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    isLargeInput: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, isLargeInput && styles.largeInput]}
        multiline
        numberOfLines={isLargeInput ? 4 : 2}
        placeholder={`Enter ${label.toLowerCase()}...`}
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>New Feature Request</Text>
        <Text style={styles.subtitle}>
          Please fill in the details for your new feature request
        </Text>

        {renderFormField("Feature you wish to have", formData.reason, (text) =>
          setFormData({ ...formData, reason: text })
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
