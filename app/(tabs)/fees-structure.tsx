import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Stack } from "expo-router";

const PRIMARY_COLOR = "#1a7de7";

interface FeeCategory {
  id: string;
  title: string;
  amount: string;
  dueDate: string;
}

interface YearSemesterFees {
  year: number;
  semester: number;
  totalAmount: string;
  categories: FeeCategory[];
}

export default function FeesStructureScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const feeStructure: YearSemesterFees[] = [
    {
      year: 1,
      semester: 1,
      totalAmount: "UGX 2,500,000",
      categories: [
        {
          id: "1",
          title: "Tuition Fee",
          amount: "UGX 1,800,000",
          dueDate: "Before semester start",
        },
        {
          id: "2",
          title: "Laboratory Fee",
          amount: "UGX 400,000",
          dueDate: "Within first month",
        },
        {
          id: "3",
          title: "Development Fee",
          amount: "UGX 300,000",
          dueDate: "Before semester start",
        },
      ],
    },
    {
      year: 1,
      semester: 2,
      totalAmount: "UGX 2,300,000",
      categories: [
        {
          id: "4",
          title: "Tuition Fee",
          amount: "UGX 1,800,000",
          dueDate: "Before semester start",
        },
        {
          id: "5",
          title: "Laboratory Fee",
          amount: "UGX 400,000",
          dueDate: "Within first month",
        },
        {
          id: "6",
          title: "Library Fee",
          amount: "UGX 100,000",
          dueDate: "Before semester start",
        },
      ],
    },
    {
      year: 2,
      semester: 1,
      totalAmount: "UGX 2,700,000",
      categories: [
        {
          id: "7",
          title: "Tuition Fee",
          amount: "UGX 2,000,000",
          dueDate: "Before semester start",
        },
        {
          id: "8",
          title: "Laboratory Fee",
          amount: "UGX 500,000",
          dueDate: "Within first month",
        },
        {
          id: "9",
          title: "Research Fee",
          amount: "UGX 200,000",
          dueDate: "Before semester start",
        },
      ],
    },
    {
      year: 2,
      semester: 2,
      totalAmount: "UGX 2,700,000",
      categories: [
        {
          id: "10",
          title: "Tuition Fee",
          amount: "UGX 2,000,000",
          dueDate: "Before semester start",
        },
        {
          id: "11",
          title: "Laboratory Fee",
          amount: "UGX 500,000",
          dueDate: "Within first month",
        },
        {
          id: "12",
          title: "Project Fee",
          amount: "UGX 200,000",
          dueDate: "Before semester start",
        },
      ],
    },
    {
      year: 3,
      semester: 1,
      totalAmount: "UGX 3,000,000",
      categories: [
        {
          id: "13",
          title: "Tuition Fee",
          amount: "UGX 2,200,000",
          dueDate: "Before semester start",
        },
        {
          id: "14",
          title: "Laboratory Fee",
          amount: "UGX 500,000",
          dueDate: "Within first month",
        },
        {
          id: "15",
          title: "Final Project Fee",
          amount: "UGX 300,000",
          dueDate: "Before semester start",
        },
      ],
    },
    {
      year: 3,
      semester: 2,
      totalAmount: "UGX 3,000,000",
      categories: [
        {
          id: "16",
          title: "Tuition Fee",
          amount: "UGX 2,200,000",
          dueDate: "Before semester start",
        },
        {
          id: "17",
          title: "Laboratory Fee",
          amount: "UGX 500,000",
          dueDate: "Within first month",
        },
        {
          id: "18",
          title: "Graduation Fee",
          amount: "UGX 300,000",
          dueDate: "Before semester start",
        },
      ],
    },
  ];

  const totalProgramCost = feeStructure.reduce(
    (total, semester) =>
      total + parseInt(semester.totalAmount.replace(/[^0-9]/g, "")),
    0
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f8fafc",
    },
    totalCostCard: {
      margin: 16,
      padding: 24,
      borderRadius: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    totalCostTitle: {
      fontSize: 16,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      fontFamily: "SharpSansNo1",
    },
    totalCostAmount: {
      fontSize: 32,
      fontWeight: "700",
      color: PRIMARY_COLOR,
      fontFamily: "SharpSansBold",
    },
    yearContainer: {
      marginBottom: 24,
    },
    yearTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginHorizontal: 16,
      marginBottom: 12,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      fontFamily: "SharpSansBold",
    },
    semesterCard: {
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
    semesterHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    semesterInfo: {
      flex: 1,
    },
    semesterTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
      fontFamily: "SharpSansBold",
    },
    semesterTotal: {
      fontSize: 20,
      fontWeight: "700",
      color: PRIMARY_COLOR,
      fontFamily: "SharpSansBold",
    },
    feeItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2a3244" : "#f0f0f0",
    },
    feeInfo: {
      flex: 1,
    },
    feeTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
      fontFamily: "SharpSansBold",
    },
    feeDueDate: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      fontFamily: "SharpSansNo1",
    },
    feeAmount: {
      fontSize: 16,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginLeft: 16,
      fontFamily: "SharpSansBold",
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
          headerTitle: "Fees Structure",
        }}
      />

      <ScrollView>
        <View style={styles.totalCostCard}>
          <Text style={styles.totalCostTitle}>Total Program Cost</Text>
          <Text style={styles.totalCostAmount}>
            UGX {totalProgramCost.toLocaleString()}
          </Text>
        </View>

        {[1, 2, 3].map((year) => (
          <View key={year} style={styles.yearContainer}>
            <Text style={styles.yearTitle}>Year {year}</Text>
            {feeStructure
              .filter((semester) => semester.year === year)
              .map((semester) => (
                <View
                  key={`${year}-${semester.semester}`}
                  style={styles.semesterCard}
                >
                  <View style={styles.semesterHeader}>
                    <View style={styles.semesterInfo}>
                      <Text style={styles.semesterTitle}>
                        Semester {semester.semester}
                      </Text>
                    </View>
                    <Text style={styles.semesterTotal}>
                      {semester.totalAmount}
                    </Text>
                  </View>

                  {semester.categories.map((fee) => (
                    <View key={fee.id} style={styles.feeItem}>
                      <View style={styles.feeInfo}>
                        <Text style={styles.feeTitle}>{fee.title}</Text>
                        <Text style={styles.feeDueDate}>{fee.dueDate}</Text>
                      </View>
                      <Text style={styles.feeAmount}>{fee.amount}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
