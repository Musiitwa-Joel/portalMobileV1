import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

const PRIMARY_COLOR = "#1a7de7";
const { width } = Dimensions.get("window");

interface Transaction {
  id: string;
  referenceNumber: string;
  amount: string;
  type: "payment" | "charge" | "refund";
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
  year: number;
  semester: number;
  details: {
    amountPaid: string;
    amountDue: string;
    datePaid: string;
    bank: string;
    branch: string;
    paymentMethod: string;
    category: string;
    notes?: string;
  };
}

export default function TransactionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const transactions: Transaction[] = [
    {
      id: "1",
      referenceNumber: "TRX-2024-001-8745",
      amount: "$3,500.00",
      type: "payment",
      status: "completed",
      date: "2024-03-01 14:30",
      description: "Tuition Payment",
      year: 3,
      semester: 2,
      details: {
        amountPaid: "$3,500.00",
        amountDue: "$0.00",
        datePaid: "2024-03-01 14:30:45",
        bank: "Chase Bank",
        branch: "University Campus Branch",
        paymentMethod: "Bank Transfer",
        category: "Tuition Fee",
        notes: "Payment received and processed successfully",
      },
    },
    {
      id: "2",
      referenceNumber: "TRX-2024-001-8746",
      amount: "$800.00",
      type: "charge",
      status: "pending",
      date: "2024-03-02 09:15",
      description: "Laboratory Fee",
      year: 3,
      semester: 2,
      details: {
        amountPaid: "$0.00",
        amountDue: "$800.00",
        datePaid: "-",
        bank: "-",
        branch: "-",
        paymentMethod: "Pending",
        category: "Laboratory Fee",
      },
    },
    {
      id: "3",
      referenceNumber: "TRX-2024-001-8747",
      amount: "$150.00",
      type: "refund",
      status: "completed",
      date: "2024-03-03 16:45",
      description: "Course Withdrawal Refund",
      year: 3,
      semester: 1,
      details: {
        amountPaid: "$150.00",
        amountDue: "$0.00",
        datePaid: "2024-03-03 16:45:22",
        bank: "Wells Fargo",
        branch: "Main Street Branch",
        paymentMethod: "Direct Deposit",
        category: "Refund",
        notes: "Refund for dropped course processed",
      },
    },
    {
      id: "4",
      referenceNumber: "TRX-2023-002-9845",
      amount: "$3,200.00",
      type: "payment",
      status: "completed",
      date: "2023-09-15 10:30",
      description: "Tuition Payment",
      year: 2,
      semester: 2,
      details: {
        amountPaid: "$3,200.00",
        amountDue: "$0.00",
        datePaid: "2023-09-15 10:30:15",
        bank: "Bank of America",
        branch: "Downtown Branch",
        paymentMethod: "Online Banking",
        category: "Tuition Fee",
      },
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f8fafc",
    },
    summaryContainer: {
      flexDirection: "row",
      padding: 16,
      gap: 12,
    },
    summaryCard: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryLabel: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 4,
      fontFamily: "SharpSansNo1",
    },
    summaryValue: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    transactionCard: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    transactionContent: {
      padding: 16,
    },
    transactionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    transactionInfo: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
      fontFamily: "SharpSansBold",
    },
    transactionMeta: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 2,
      fontFamily: "SharpSansNo1",
    },
    yearSemester: {
      fontSize: 12,
      color: PRIMARY_COLOR,
      fontWeight: "600",
      marginBottom: 4,
      fontFamily: "SharpSansBold",
    },
    amount: {
      fontSize: 18,
      fontWeight: "700",
      marginLeft: 12,
      fontFamily: "SharpSansBold",
    },
    amountPayment: {
      color: "#00c853",
    },
    amountCharge: {
      color: PRIMARY_COLOR,
    },
    amountRefund: {
      color: "#ff9800",
    },
    status: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      fontSize: 12,
      fontWeight: "500",
      alignSelf: "flex-start",
      marginTop: 8,
      fontFamily: "SharpSansBold",
    },
    completed: {
      backgroundColor: isDark ? "rgba(0,200,83,0.2)" : "rgba(0,200,83,0.1)",
      color: "#00c853",
    },
    pending: {
      backgroundColor: isDark ? "rgba(255,152,0,0.2)" : "rgba(255,152,0,0.1)",
      color: "#ff9800",
    },
    failed: {
      backgroundColor: isDark ? "rgba(255,68,68,0.2)" : "rgba(255,68,68,0.1)",
      color: "#ff4444",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      minHeight: "70%",
      padding: 20,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    closeButton: {
      padding: 8,
    },
    modalYearSemester: {
      fontSize: 16,
      color: PRIMARY_COLOR,
      fontWeight: "600",
      marginBottom: 16,
      fontFamily: "SharpSansBold",
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    detailLabel: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      fontFamily: "SharpSansNo1",
    },
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      textAlign: "right",
      fontFamily: "SharpSansBold",
    },
    notes: {
      marginTop: 20,
      padding: 16,
      backgroundColor: isDark ? "#2a3244" : "#f8fafc",
      borderRadius: 12,
    },
    notesTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    notesText: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      lineHeight: 20,
      fontFamily: "SharpSansNo1",
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
      fontFamily: "SharpSansBold",
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      fontFamily: "SharpSansNo1",
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
          },
          headerTintColor: isDark ? "#fff" : "",
          headerTitle: "Transactions",
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <Text style={styles.headerSubtitle}>
          View your payment history by semester
        </Text>
      </View>

      <ScrollView>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Total amount in transactions
            </Text>
            <Text style={styles.summaryValue}>UGX 16,850,000.00</Text>
          </View>
        </View>

        {transactions.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionCard}
            onPress={() => setSelectedTransaction(transaction)}
            activeOpacity={0.7}
          >
            <View style={styles.transactionContent}>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.yearSemester}>
                    Year {transaction.year}, Semester {transaction.semester}
                  </Text>
                  <Text style={styles.transactionTitle}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionMeta}>{transaction.date}</Text>
                  <Text style={styles.transactionMeta}>
                    Ref: {transaction.referenceNumber}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.amount,
                    transaction.type === "payment"
                      ? styles.amountPayment
                      : transaction.type === "refund"
                      ? styles.amountRefund
                      : styles.amountCharge,
                  ]}
                >
                  {transaction.type === "payment"
                    ? "-"
                    : transaction.type === "refund"
                    ? "+"
                    : ""}
                  {transaction.amount}
                </Text>
              </View>
              <Text style={[styles.status, styles[transaction.status]]}>
                {transaction.status.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedTransaction}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Transaction Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedTransaction(null)}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            </View>

            {selectedTransaction && (
              <>
                <Text style={styles.modalYearSemester}>
                  Year {selectedTransaction.year}, Semester{" "}
                  {selectedTransaction.semester}
                </Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Reference Number</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.referenceNumber}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount Paid</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.amountPaid}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount Due</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.amountDue}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date Paid</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.datePaid}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Bank</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.bank}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Branch</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.branch}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.paymentMethod}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Category</Text>
                  <Text style={styles.detailValue}>
                    {selectedTransaction.details.category}
                  </Text>
                </View>

                {selectedTransaction.details.notes && (
                  <View style={styles.notes}>
                    <Text style={styles.notesTitle}>Notes</Text>
                    <Text style={styles.notesText}>
                      {selectedTransaction.details.notes}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
