"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY_COLOR = "#1a7de7";
const { width } = Dimensions.get("window");

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  items: {
    description: string;
    amount: string;
  }[];
  paymentMethod?: string;
  paidDate?: string;
}

interface Semester {
  id: string;
  name: string;
  invoices: Invoice[];
}

interface AcademicYear {
  id: string;
  name: string;
  semesters: Semester[];
}

export default function InvoicesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const academicYears: AcademicYear[] = [
    {
      id: "1",
      name: "Year 1 (2023/2024)",
      semesters: [
        {
          id: "1-1",
          name: "Semester 1",
          invoices: [
            {
              id: "1",
              invoiceNumber: "INV-2024-001",
              date: "2024-03-01",
              dueDate: "2024-03-15",
              amount: "UGX 13,500,000,00",
              status: "paid",
              description: "Tuition Fees",
              items: [
                // {
                //   description: "Core Courses (15 credits)",
                //   amount: "$3,000.00",
                // },
                // { description: "Technology Fee", amount: "$300.00" },
                // { description: "Library Access", amount: "$200.00" },
              ],
              paymentMethod: "Centenary Bank",
              paidDate: "2024-03-10",
            },
            {
              id: "2",
              invoiceNumber: "INV-2024-002",
              date: "2024-03-05",
              dueDate: "2024-03-19",
              amount: "UGX 457,500.00",
              status: "pending",
              description: "Functional Fees",
              items: [
                { description: "Caution money", amount: "UGX 10,000.00" },
                { description: "Development fee", amount: "UGX 100,000.00" },
                { description: "Examination fee", amount: "UGX 40,000.00" },
                { description: "Guild fee", amount: "UGX 45,000.00" },
                { description: "ICT", amount: "UGX 45,000.00" },
                { description: "Identity card", amount: "UGX 15,000.00" },
                { description: "Journal", amount: "UGX 10,000.00" },
                { description: "Library fee", amount: "UGX 40,500.00" },
                { description: "Medical fee", amount: "UGX 50,000.00" },
                { description: "Registration fee", amount: "UGX 50,000.00" },
                { description: "Rules fee", amount: "UGX 2,000.00" },
                { description: "Undergraduate gown", amount: "UGX 50,000.00" },
              ],
            },
          ],
        },
        {
          id: "1-2",
          name: "Semester 2",
          invoices: [
            {
              id: "3",
              invoiceNumber: "INV-2024-003",
              date: "2024-03-10",
              dueDate: "2024-03-24",
              amount: "$150.00",
              status: "overdue",
              description: "Library Access Fee",
              items: [
                { description: "Digital Resources Access", amount: "$100.00" },
                { description: "Printing Credits", amount: "$50.00" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Year 2 (2024/2025)",
      semesters: [
        {
          id: "2-1",
          name: "Semester 1",
          invoices: [],
        },
        {
          id: "2-2",
          name: "Semester 2",
          invoices: [],
        },
      ],
    },
    {
      id: "3",
      name: "Year 3 (2025/2026)",
      semesters: [
        {
          id: "3-1",
          name: "Semester 1",
          invoices: [],
        },
        {
          id: "3-2",
          name: "Semester 2",
          invoices: [],
        },
      ],
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f8fafc",
    },
    header: {
      padding: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
    },
    headerContent: {
      marginTop: 8,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    headerSubtitle: {
      fontSize: 15,
      color: isDark ? "#8f9bba" : "#666",
      lineHeight: 22,
      fontFamily: "SharpSansNo1",
    },
    summaryContainer: {
      margin: 16,
      borderRadius: 16,
      overflow: "hidden",
    },
    summaryContent: {
      padding: 20,
    },
    summaryGrid: {
      flexDirection: "row",
      marginHorizontal: -8,
    },
    summaryCard: {
      flex: 1,
      margin: 8,
      padding: 16,
      borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    summaryLabel: {
      fontSize: 14,
      color: "rgba(255,255,255,0.8)",
      marginBottom: 8,
      fontFamily: "SharpSansNo1",
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: "700",
      color: "#fff",
      fontFamily: "SharpSansBold",
    },
    filterContainer: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      marginBottom: 16,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
    },
    filterButtonActive: {
      backgroundColor: PRIMARY_COLOR,
      borderColor: PRIMARY_COLOR,
    },
    filterButtonInactive: {
      backgroundColor: "transparent",
      borderColor: isDark ? "#2a3244" : "#e2e8f0",
    },
    filterButtonText: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    filterButtonTextActive: {
      color: "#fff",
    },
    filterButtonTextInactive: {
      color: isDark ? "#8f9bba" : "#666",
    },
    yearContainer: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    yearHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: isDark ? "#2a3244" : "#f8fafc",
    },
    yearTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    semesterContainer: {
      borderTopWidth: 1,
      borderTopColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    semesterHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
    },
    semesterTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    invoiceContainer: {
      backgroundColor: isDark ? "#2a3244" : "#f8fafc",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#1a2234" : "#f0f0f0",
    },
    invoiceHeader: {
      marginBottom: 12,
    },
    invoiceHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    invoiceNumber: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    status: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      fontSize: 12,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    paid: {
      backgroundColor: isDark ? "rgba(0,200,83,0.2)" : "rgba(0,200,83,0.1)",
      color: "#00c853",
    },
    pending: {
      backgroundColor: isDark ? "rgba(255,152,0,0.2)" : "rgba(255,152,0,0.1)",
      color: "#ff9800",
    },
    overdue: {
      backgroundColor: isDark ? "rgba(255,68,68,0.2)" : "rgba(255,68,68,0.1)",
      color: "#ff4444",
    },
    description: {
      fontSize: 16,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dateColumn: {
      flex: 1,
    },
    dateLabel: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 4,
      fontFamily: "SharpSansNo1",
    },
    dateValue: {
      fontSize: 13,
      color: isDark ? "#fff" : "#000",
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    amount: {
      fontSize: 20,
      fontWeight: "700",
      color: PRIMARY_COLOR,
      textAlign: "right",
      fontFamily: "SharpSansBold",
    },
    invoiceContent: {
      marginTop: 16,
    },
    itemsTable: {
      marginBottom: 16,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    },
    itemDescription: {
      flex: 1,
      fontSize: 13,
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansNo1",
    },
    itemAmount: {
      fontSize: 13,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginLeft: 16,
      fontFamily: "SharpSansBold",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 12,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
    },
    totalLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    totalAmount: {
      fontSize: 14,
      fontWeight: "700",
      color: PRIMARY_COLOR,
      fontFamily: "SharpSansBold",
    },
    paymentInfo: {
      marginTop: 16,
      padding: 12,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 8,
    },
    paymentInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    paymentInfoLabel: {
      fontSize: 13,
      color: isDark ? "#8f9bba" : "#666",
      fontFamily: "SharpSansNo1",
    },
    paymentInfoValue: {
      fontSize: 13,
      color: isDark ? "#fff" : "#000",
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRadius: 8,
      marginTop: 16,
    },
    actionButtonPrimary: {
      backgroundColor: PRIMARY_COLOR,
    },
    actionButtonSecondary: {
      backgroundColor: isDark ? "rgba(26,125,231,0.1)" : "rgba(26,125,231,0.1)",
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 8,
      fontFamily: "SharpSansBold",
    },
    actionButtonTextPrimary: {
      color: "#fff",
    },
    actionButtonTextSecondary: {
      color: PRIMARY_COLOR,
    },
    chevronIcon: {
      padding: 4,
    },
    noInvoices: {
      padding: 16,
      textAlign: "center",
      color: isDark ? "#8f9bba" : "#666",
      fontStyle: "italic",
    },
  });

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Overdue", value: "overdue" },
  ];

  const filterInvoices = (invoices: Invoice[]) => {
    if (selectedFilter === "all") return invoices;
    return invoices.filter((invoice) => invoice.status === selectedFilter);
  };

  const calculateTotals = () => {
    const totals = {
      paid: 0,
      pending: 0,
      overdue: 0,
    };

    academicYears.forEach((year) => {
      year.semesters.forEach((semester) => {
        semester.invoices.forEach((invoice) => {
          const amount = Number.parseFloat(
            invoice.amount.replace("$", "").replace(",", "")
          );
          if (invoice.status === "paid") totals.paid += amount;
          else if (invoice.status === "pending") totals.pending += amount;
          else if (invoice.status === "overdue") totals.overdue += amount;
        });
      });
    });

    return totals;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Invoices</Text>
          <Text style={styles.headerSubtitle}>
            Track and manage your academic payments
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.filterContainer}>
          {filterButtons.map((button) => (
            <TouchableOpacity
              key={button.value}
              style={[
                styles.filterButton,
                selectedFilter === button.value
                  ? styles.filterButtonActive
                  : styles.filterButtonInactive,
              ]}
              onPress={() => setSelectedFilter(button.value as any)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === button.value
                    ? styles.filterButtonTextActive
                    : styles.filterButtonTextInactive,
                ]}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {academicYears.map((year) => (
          <View key={year.id} style={styles.yearContainer}>
            <TouchableOpacity
              style={styles.yearHeader}
              onPress={() =>
                setExpandedYear(expandedYear === year.id ? null : year.id)
              }
            >
              <Text style={styles.yearTitle}>{year.name}</Text>
              <Ionicons
                name={expandedYear === year.id ? "chevron-up" : "chevron-down"}
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
            {expandedYear === year.id &&
              year.semesters.map((semester) => (
                <View key={semester.id} style={styles.semesterContainer}>
                  <TouchableOpacity
                    style={styles.semesterHeader}
                    onPress={() =>
                      setExpandedSemester(
                        expandedSemester === semester.id ? null : semester.id
                      )
                    }
                  >
                    <Text style={styles.semesterTitle}>{semester.name}</Text>
                    <Ionicons
                      name={
                        expandedSemester === semester.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={20}
                      color={isDark ? "#fff" : "#000"}
                      style={styles.chevronIcon}
                    />
                  </TouchableOpacity>
                  {expandedSemester === semester.id &&
                    (filterInvoices(semester.invoices).length > 0 ? (
                      filterInvoices(semester.invoices).map((invoice) => (
                        <View key={invoice.id} style={styles.invoiceContainer}>
                          <View style={styles.invoiceHeader}>
                            <View style={styles.invoiceHeaderRow}>
                              <Text style={styles.invoiceNumber}>
                                {invoice.invoiceNumber}
                              </Text>
                              <Text
                                style={[styles.status, styles[invoice.status]]}
                              >
                                {invoice.status.charAt(0).toUpperCase() +
                                  invoice.status.slice(1)}
                              </Text>
                            </View>
                            <Text style={styles.description}>
                              {invoice.description}
                            </Text>
                            <View style={styles.dateRow}>
                              <View style={styles.dateColumn}>
                                <Text style={styles.dateLabel}>Issue Date</Text>
                                <Text style={styles.dateValue}>
                                  {invoice.date}
                                </Text>
                              </View>
                              {/* <View style={styles.dateColumn}> */}
                              {/* <Text style={styles.dateLabel}>Due Date</Text> */}
                              {/* <Text style={styles.dateValue}>
                                  {invoice.dueDate}
                                </Text> */}
                              {/* </View> */}
                              <Text style={styles.amount}>
                                {invoice.amount}
                              </Text>
                            </View>
                          </View>

                          {selectedInvoice === invoice.id && (
                            <View style={styles.invoiceContent}>
                              <View style={styles.itemsTable}>
                                {invoice.items.map((item, index) => (
                                  <View key={index} style={styles.itemRow}>
                                    <Text style={styles.itemDescription}>
                                      {item.description}
                                    </Text>
                                    <Text style={styles.itemAmount}>
                                      {item.amount}
                                    </Text>
                                  </View>
                                ))}
                                <View style={styles.totalRow}>
                                  <Text style={styles.totalLabel}>
                                    Total Amount
                                  </Text>
                                  <Text style={styles.totalAmount}>
                                    {invoice.amount}
                                  </Text>
                                </View>
                              </View>

                              {invoice.status === "paid" && (
                                <View style={styles.paymentInfo}>
                                  <View style={styles.paymentInfoRow}>
                                    <Text style={styles.paymentInfoLabel}>
                                      Payment Method
                                    </Text>
                                    <Text style={styles.paymentInfoValue}>
                                      {invoice.paymentMethod}
                                    </Text>
                                  </View>
                                  <View style={styles.paymentInfoRow}>
                                    <Text style={styles.paymentInfoLabel}>
                                      Payment Date
                                    </Text>
                                    <Text style={styles.paymentInfoValue}>
                                      {invoice.paidDate}
                                    </Text>
                                  </View>
                                </View>
                              )}

                              <TouchableOpacity
                                style={[
                                  styles.actionButton,
                                  styles.actionButtonSecondary,
                                ]}
                                onPress={() => setSelectedInvoice(null)}
                              >
                                <Ionicons
                                  name="chevron-up"
                                  size={20}
                                  color={PRIMARY_COLOR}
                                />
                                <Text
                                  style={[
                                    styles.actionButtonText,
                                    styles.actionButtonTextSecondary,
                                  ]}
                                >
                                  Hide Details
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}

                          {selectedInvoice !== invoice.id && (
                            <TouchableOpacity
                              style={[
                                styles.actionButton,
                                invoice.status === "paid"
                                  ? styles.actionButtonSecondary
                                  : styles.actionButtonPrimary,
                              ]}
                              onPress={() => setSelectedInvoice(invoice.id)}
                            >
                              {invoice.status === "paid" ? (
                                <>
                                  <Ionicons
                                    name="document-text-outline"
                                    size={20}
                                    color={PRIMARY_COLOR}
                                  />
                                  <Text
                                    style={[
                                      styles.actionButtonText,
                                      styles.actionButtonTextSecondary,
                                    ]}
                                  >
                                    View Details
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Ionicons
                                    name="card-outline"
                                    size={20}
                                    color="#fff"
                                  />
                                  <Text
                                    style={[
                                      styles.actionButtonText,
                                      styles.actionButtonTextPrimary,
                                    ]}
                                  >
                                    Pay Now
                                  </Text>
                                </>
                              )}
                            </TouchableOpacity>
                          )}
                        </View>
                      ))
                    ) : (
                      <Text style={styles.noInvoices}>
                        No invoices for this semester
                      </Text>
                    ))}
                </View>
              ))}
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
