import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TermsOfService() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const colorScheme = useColorScheme();

  const theme = {
    background: colorScheme === "dark" ? "#1a1a1a" : "#ffffff",
    text: colorScheme === "dark" ? "#ffffff" : "#000000",
    primary: "#1a7de7",
    secondary: colorScheme === "dark" ? "#2c2c2c" : "#f5f5f5",
    border: colorScheme === "dark" ? "#333333" : "#e0e0e0",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    headerIcon: {
      width: 40,
      height: 40,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      //   fontWeight: "bold",
      color: theme.primary,
      fontFamily: "SharpSansBold",
    },
    updateDate: {
      color: "#666",
      marginTop: 4,
      fontFamily: "SharpSansNo1",
    },
    content: {
      flex: 1,
      backgroundColor: theme.secondary,
      borderRadius: 15,
      padding: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 10,
      fontFamily: "SharpSansBold",
    },
    sectionText: {
      color: theme.text,
      lineHeight: 20,
      fontFamily: "SharpSansNo1",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      marginLeft: 10,
      marginTop: 10,
    },
    checkboxText: {
      marginLeft: 10,
      color: theme.text,
      fontFamily: "SharpSansNo1",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 20,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      minWidth: 120,
      alignItems: "center",
    },
    declineButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.border,
    },
    acceptButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "SharpSansNo1",
    },
    declineButtonText: {
      color: theme.text,
      fontFamily: "SharpSansNo1",
    },
    acceptButtonText: {
      color: "#ffffff",
      fontFamily: "SharpSansNo1",
    },
  });
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: theme.secondary }]}>
          <Ionicons name="document-text" size={24} color={theme.primary} />
        </View>
        <View>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.updateDate}>Last Updated on 16/02/2020</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1 - General Conditions</Text>
          <Text style={styles.sectionText}>
            Refunds are only available to students who meet the specified
            criteria for overpayment, course cancellation, withdrawal, incorrect
            charges, or other approved reasons.
          </Text>
        </View>

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}> - Privacy Policy</Text> */}
          <Text style={styles.sectionText}>
            Refunds are only available to students who meet the specified
            criteria for overpayment, course cancellation, withdrawal, incorrect
            charges, or other approved reasons.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}> - Privacy Policy</Text> */}
          <Text style={styles.sectionText}>
            Refund amounts will be calculated based on the payment made, less
            any applicable administrative fees or deductions for services
            already rendered.
          </Text>
        </View>

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}> - Privacy Policy</Text> */}
          <Text style={styles.sectionText}>
            In cases of partial refunds, the amount will be proportional to the
            duration of the course attended or the services rendered.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}> - Privacy Policy</Text> */}
          <Text style={styles.sectionText}>
            The institution reserves the right to amend the refund policy at any
            time. Changes will be communicated through official channels and
            will not affect requests submitted prior to the change.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2 -Process and Procedure</Text>
          <Text style={styles.sectionText}>
            All refund requests must be submitted through the official refund
            request form available on our mobile app.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>2 -Process and Procedure</Text> */}
          <Text style={styles.sectionText}>
            Requests must include all necessary supporting documentation, such
            as proof of payment, official withdrawal forms, and any other
            relevant documents.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>2 -Process and Procedure</Text> */}
          <Text style={styles.sectionText}>
            Refund requests will be processed within 30 days from the date of
            submission. Notification of the decision will be sent via email.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>2 -Process and Procedure</Text> */}
          <Text style={styles.sectionText}>
            Approved refunds will be disbursed through the original payment
            method or other agreed-upon methods.
          </Text>
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>2 -Process and Procedure</Text> */}
          <Text style={styles.sectionText}>
            If a refund request is denied, students have the right to appeal the
            decision within 14 days from the date of notification. Appeals must
            be submitted in writing with additional supporting documentation.
          </Text>
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <Ionicons
            name={
              termsAccepted ? "checkmark-circle" : "checkmark-circle-outline"
            }
            size={24}
            color={termsAccepted ? theme.primary : "#666"}
          />
          <Text style={styles.checkboxText}>
            I agree with the General Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setPrivacyAccepted(!privacyAccepted)}
        >
          <Ionicons
            name={
              privacyAccepted ? "checkmark-circle" : "checkmark-circle-outline"
            }
            size={24}
            color={privacyAccepted ? theme.primary : "#666"}
          />
          <Text style={styles.checkboxText}>
            I agree with the Process and Procedure
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => router.push("/services")}
            style={[styles.button, styles.declineButton]}
          >
            <Text
              onPress={() => router.push("/services")}
              style={[styles.buttonText, styles.declineButtonText]}
            >
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/refund_status")}
            style={[
              styles.button,
              styles.acceptButton,
              (!termsAccepted || !privacyAccepted) && { opacity: 0.5 },
            ]}
            disabled={!termsAccepted || !privacyAccepted}
          >
            <Text
              onPress={() => router.push("/refund_status")}
              style={[styles.buttonText, styles.acceptButtonText]}
            >
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
