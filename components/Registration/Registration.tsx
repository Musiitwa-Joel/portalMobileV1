import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { LOAD_STUDENT_FILE } from "../../app/gql/queries";
import AppContext, { AppContextType } from "../../app/context/AppContext";

interface StudentRegistrationProps {
  profileImage?: string;
  name?: string;
  studentNumber?: string;
}

export default function StudentRegistrationScreen({
  profileImage,
  name,
  studentNumber,
}: StudentRegistrationProps) {
  const colorScheme = useColorScheme();
  const primaryColor = "#1a7de7";

  const { studentFile } = useContext<AppContextType>(AppContext);

  const { data, loading, error } = useQuery(LOAD_STUDENT_FILE, {
    variables: { studentNo: studentFile?.student_no },
    skip: !!studentFile,
  });

  const displayProfileImage =
    profileImage ||
    studentFile?.photo_url ||
    `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentFile?.student_no}`;

  const displayName =
    `${studentFile?.biodata.surname || ""} ${studentFile?.biodata.other_names || ""}`.trim();
  const displayStudentNumber =
    studentNumber || studentFile?.student_no || "N/A";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#f5f5f5",
    },
    card: {
      backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      margin: 16,
      shadowColor: colorScheme === "dark" ? "#000000" : "#CCCCCC",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 5,
      marginRight: 12,
      marginTop: -10,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#FFFFFF" : "#333333",
      fontFamily: "SharpSansBold",
    },
    studentNumber: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#BBBBBB" : "#666666",
      fontFamily: "SharpSansNo1",
    },
    registrationStatus: {
      fontSize: 14,
      fontWeight: "600",
      color: primaryColor,
      marginBottom: 12,
      fontFamily: "SharpSansBold",
    },
    noticeContainer: {
      backgroundColor: colorScheme === "dark" ? "#2C2C2C" : "#F0F0F0",
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#444444" : "purple",
      marginVertical: 10,
      borderStyle: "dashed",
    },

    registerButton: {
      backgroundColor: colorScheme === "dark" ? "#3333FF" : primaryColor,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    registerButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    errorText: {
      color: "red",
      fontSize: 16,
      textAlign: "center",
      fontFamily: "SharpSansNo1",
    },
    noticeTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#FFFFFF" : "#212529",
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    bulletContainer: {
      marginLeft: 10,
    },
    bulletText: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#CCCCCC" : "#495057",
      lineHeight: 20,
      marginBottom: 6,
      fontFamily: "SharpSansNo1",
    },
  });

  const handleRegister = () => {
    Alert.alert(
      "Important Notice",
      "Once registered, you cannot modify your course units for this semester.",
      [{ text: "Understood", style: "default" }]
    );
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={primaryColor}
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading student information</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: displayProfileImage }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.studentNumber}>
                Student Number: {displayStudentNumber}
              </Text>
              <Text style={styles.studentNumber}>
                Year {studentFile.current_info.recent_enrollment.study_yr}{" "}
                Semester {studentFile.current_info.recent_enrollment.sem}
              </Text>
              <Text style={styles.registrationStatus}>
                Registration Status: Mandatory
              </Text>
            </View>
          </View>

          <View style={styles.noticeContainer}>
            <Text style={styles.noticeTitle}>Important Notice</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>
                • You may only register for the academic year and semester shown
                above.
              </Text>
              <Text style={styles.bulletText}>
                • If these details are incorrect, please enroll in your desired
                semester first.
              </Text>
              <Text style={styles.bulletText}>
                • Registration requires meeting all minimum fee policy
                requirements.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
