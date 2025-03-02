"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from "react-native";

const PRIMARY_COLOR = "#1a7de7";

interface RefundRequest {
  id: string;
  date: string;
  amount: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  comments?: string;
}

export default function RefundScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const refundRequests: RefundRequest[] = [
    {
      id: "1",
      date: "2024-03-15",
      amount: "$150.00",
      reason: "Withdrawal from optional course",
      status: "approved",
      comments: "Approved. Refund will be processed within 5-7 business days.",
    },
    {
      id: "2",
      date: "2024-03-10",
      amount: "$75.00",
      reason: "Duplicate payment for library fee",
      status: "pending",
    },
    {
      id: "3",
      date: "2024-03-01",
      amount: "$200.00",
      reason: "Cancelled workshop registration",
      status: "rejected",
      comments: "Request submitted after deadline.",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000" : "#f8fafc",
    },
    header: {
      padding: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
    },
    formContainer: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      margin: 16,
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 8,
    },
    input: {
      backgroundColor: isDark ? "#2a3244" : "#f8fafc",
      borderRadius: 8,
      padding: 12,
      color: isDark ? "#fff" : "#000",
      marginBottom: 16,
    },
    submitButton: {
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
    },
    submitButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    historyContainer: {
      margin: 16,
    },
    historyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 16,
    },
    requestCard: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    requestHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    requestDate: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
    },
    requestAmount: {
      fontSize: 18,
      fontWeight: "700",
      color: PRIMARY_COLOR,
    },
    requestReason: {
      fontSize: 14,
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    statusText: {
      fontSize: 14,
      fontWeight: "600",
    },
    statusPending: {
      backgroundColor: "#ff9800",
      color: "#ff9800",
    },
    statusApproved: {
      backgroundColor: "#00c853",
      color: "#00c853",
    },
    statusRejected: {
      backgroundColor: "#ff4444",
      color: "#ff4444",
    },
    comments: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      fontStyle: "italic",
    },
  });

  const getStatusStyle = (status: RefundRequest["status"]) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Refund Request</Text>
        <Text style={styles.headerSubtitle}>
          Submit and track refund requests
        </Text>
      </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>New Request</Text>
          <Text style={styles.inputLabel}>Amount ($)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="Enter amount"
            placeholderTextColor={isDark ? "#8f9bba" : "#666"}
          />
          <Text style={styles.inputLabel}>Reason for Refund</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            value={reason}
            onChangeText={setReason}
            placeholder="Explain the reason for your refund request"
            placeholderTextColor={isDark ? "#8f9bba" : "#666"}
            multiline
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Request History</Text>
          {refundRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <Text style={styles.requestDate}>{request.date}</Text>
                <Text style={styles.requestAmount}>{request.amount}</Text>
              </View>
              <Text style={styles.requestReason}>{request.reason}</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[styles.statusDot, getStatusStyle(request.status)]}
                />
                <Text
                  style={[styles.statusText, getStatusStyle(request.status)]}
                >
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </Text>
              </View>
              {request.comments && (
                <Text style={styles.comments}>{request.comments}</Text>
              )}
            </View>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
