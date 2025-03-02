import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_COLOR = "#1a7de7";

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
  balance: string;
}

interface Semester {
  id: string;
  name: string;
  entries: LedgerEntry[];
  totalCredit: string;
  totalDebit: string;
  balance: string;
}

interface AcademicYear {
  id: string;
  name: string;
  semesters: Semester[];
}

export default function LedgerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
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
          totalCredit: "UGX 5,000,000.00",
          totalDebit: "UGX 4,500,000.00",
          balance: "UGX 5,200,000.00",
          entries: [
            {
              id: "1",
              date: "2024-03-15",
              description: "Semester Fee Payment",
              amount: "$3,500.00",
              type: "debit",
              balance: "$3,700.00",
            },
            {
              id: "2",
              date: "2024-03-10",
              description: "Library Fine",
              amount: "$25.00",
              type: "debit",
              balance: "$7,200.00",
            },
          ],
        },
        {
          id: "1-2",
          name: "Semester 2",
          totalCredit: "$5,500.00",
          totalDebit: "$5,000.00",
          balance: "$500.00",
          entries: [
            {
              id: "3",
              date: "2024-03-01",
              description: "Scholarship Credit",
              amount: "$2,000.00",
              type: "credit",
              balance: "$7,225.00",
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
          totalCredit: "$6,000.00",
          totalDebit: "$5,500.00",
          balance: "$500.00",
          entries: [],
        },
        {
          id: "2-2",
          name: "Semester 2",
          totalCredit: "$6,000.00",
          totalDebit: "$5,500.00",
          balance: "$500.00",
          entries: [],
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
          totalCredit: "$6,000.00",
          totalDebit: "$5,500.00",
          balance: "$500.00",
          entries: [],
        },
        {
          id: "3-2",
          name: "Semester 2",
          totalCredit: "$6,000.00",
          totalDebit: "$5,500.00",
          balance: "$500.00",
          entries: [],
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
    yearContainer: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
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
      backgroundColor: isDark ? "#1a2234" : "#fff",
      marginHorizontal: 16,
      marginTop: 1,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    semesterHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
    },
    semesterTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    semesterSummary: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: isDark ? "#2a3244" : "#f8fafc",
    },
    summaryItem: {
      flex: 1,
    },
    summaryLabel: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 4,
      fontFamily: "SharpSansNo1",
    },
    summaryValue: {
      fontSize: 12,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    entryContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    entryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    entryDate: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      fontFamily: "SharpSansNo1",
    },
    entryDescription: {
      fontSize: 14,
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
      fontFamily: "SharpSansNo1",
    },
    entryAmount: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    debitAmount: {
      color: "#ff4444",
    },
    creditAmount: {
      color: "#00c853",
    },
    entryBalance: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
      textAlign: "right",
      fontFamily: "SharpSansNo1",
    },
    filterButton: {
      position: "absolute",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: PRIMARY_COLOR,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: PRIMARY_COLOR,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    chevronIcon: {
      padding: 4,
    },
    noEntries: {
      padding: 16,
      textAlign: "center",
      color: isDark ? "#8f9bba" : "#666",
      fontStyle: "italic",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Financial Ledger</Text>
        <Text style={styles.headerSubtitle}>
          Track your academic financial records
        </Text>
      </View>

      <ScrollView>
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

                  {expandedSemester === semester.id && (
                    <>
                      <View style={styles.semesterSummary}>
                        <View style={styles.summaryItem}>
                          <Text style={styles.summaryLabel}>Total Credit</Text>
                          <Text
                            style={[styles.summaryValue, { color: "#00c853" }]}
                          >
                            {semester.totalCredit}
                          </Text>
                        </View>
                        <View style={styles.summaryItem}>
                          <Text style={styles.summaryLabel}>Total Debit</Text>
                          <Text
                            style={[styles.summaryValue, { color: "#ff4444" }]}
                          >
                            {semester.totalDebit}
                          </Text>
                        </View>
                        <View style={styles.summaryItem}>
                          <Text style={styles.summaryLabel}>Balance</Text>
                          <Text style={styles.summaryValue}>
                            {semester.balance}
                          </Text>
                        </View>
                      </View>

                      {semester.entries.length > 0 ? (
                        semester.entries.map((entry) => (
                          <View key={entry.id} style={styles.entryContainer}>
                            <View style={styles.entryHeader}>
                              <Text style={styles.entryDate}>{entry.date}</Text>
                              <Text
                                style={[
                                  styles.entryAmount,
                                  entry.type === "debit"
                                    ? styles.debitAmount
                                    : styles.creditAmount,
                                ]}
                              >
                                {entry.type === "debit" ? "-" : "+"}
                                {entry.amount}
                              </Text>
                            </View>
                            <Text style={styles.entryDescription}>
                              {entry.description}
                            </Text>
                            <Text style={styles.entryBalance}>
                              Balance: {entry.balance}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.noEntries}>
                          No entries for this semester
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))}
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
