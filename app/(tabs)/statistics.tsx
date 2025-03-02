import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Path } from "react-native-svg";

const PRIMARY_COLOR = "#1a7de7";
const SUCCESS_COLOR = "#00c853";
const WARNING_COLOR = "#ff9800";
const DANGER_COLOR = "#ff4444";
const { width } = Dimensions.get("window");

export default function StatisticsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedPeriod, setSelectedPeriod] = useState("year");

  const DonutChart = ({
    percentage,
    color,
    size = 100,
    strokeWidth = 10,
  }: {
    percentage: number;
    color: string;
    size?: number;
    strokeWidth?: number;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDark ? "#2a3244" : "#f0f0f0"}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    );
  };

  const ProgressBar = ({
    progress,
    color,
  }: {
    progress: number;
    color: string;
  }) => (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${progress}%`, backgroundColor: color },
        ]}
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000" : "#f8fafc",
    },
    content: {
      padding: 16,
    },
    periodSelector: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 16,
    },
    periodButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDark ? "#1a2234" : "#fff",
    },
    periodButtonActive: {
      backgroundColor: PRIMARY_COLOR,
    },
    periodButtonText: {
      color: isDark ? "#8f9bba" : "#666",
      fontSize: 14,
      fontWeight: "600",
    },
    periodButtonTextActive: {
      color: "#fff",
    },
    summaryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      marginBottom: 24,
    },
    summaryCard: {
      flex: 1,
      minWidth: (width - 48) / 2,
      padding: 16,
      borderRadius: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryTitle: {
      fontSize: 14,
      color: isDark ? "#8f9bba" : "#666",
      marginBottom: 8,
    },
    summaryValue: {
      fontSize: 24,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
    },
    summaryTrend: {
      flexDirection: "row",
      alignItems: "center",
    },
    trendPositive: {
      color: SUCCESS_COLOR,
    },
    trendNegative: {
      color: DANGER_COLOR,
    },
    chartCard: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 16,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      borderRadius: 4,
      overflow: "hidden",
      marginBottom: 16,
    },
    progressBar: {
      height: "100%",
      borderRadius: 4,
    },
    breakdownItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    breakdownLabel: {
      fontSize: 14,
      color: isDark ? "#fff" : "#000",
      flex: 1,
    },
    breakdownValue: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginLeft: 16,
    },
    donutContainer: {
      alignItems: "center",
      marginVertical: 16,
    },
    donutLabel: {
      position: "absolute",
      alignItems: "center",
    },
    donutPercentage: {
      fontSize: 24,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
    },
    donutText: {
      fontSize: 12,
      color: isDark ? "#8f9bba" : "#666",
    },
    yearProgressSection: {
      marginTop: 24,
    },
    yearProgressTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      marginBottom: 16,
    },
    semesterCard: {
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    },
    semesterHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    semesterTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    semesterCompletion: {
      fontSize: 14,
      color: PRIMARY_COLOR,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: isDark ? "#1a2234" : "#fff",
          },
          headerTintColor: isDark ? "#fff" : "#000",
          headerTitle: "Statistics",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.periodSelector}>
          {["month", "semester", "year"].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Paid</Text>
            <Text style={styles.summaryValue}>UGX 32.8M</Text>
            <View style={styles.summaryTrend}>
              <Ionicons name="arrow-up" size={16} color={SUCCESS_COLOR} />
              <Text style={styles.trendPositive}>8.5% vs last month</Text>
            </View>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Outstanding</Text>
            <Text style={styles.summaryValue}>UGX 4.2M</Text>
            <View style={styles.summaryTrend}>
              <Ionicons name="arrow-down" size={16} color={SUCCESS_COLOR} />
              <Text style={styles.trendPositive}>12% vs last month</Text>
            </View>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Invoices</Text>
            <Text style={styles.summaryValue}>24</Text>
            <Text style={styles.summaryTitle}>18 Paid • 6 Pending</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Late Payments</Text>
            <Text style={styles.summaryValue}>2</Text>
            <View style={styles.summaryTrend}>
              <Ionicons name="arrow-up" size={16} color={DANGER_COLOR} />
              <Text style={styles.trendNegative}>1 more than last month</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Overall Progress</Text>
          <View style={styles.donutContainer}>
            <DonutChart percentage={75} color={PRIMARY_COLOR} size={200} />
            <View
              style={[
                styles.donutLabel,
                { height: 200, justifyContent: "center" },
              ]}
            >
              <Text style={styles.donutPercentage}>75%</Text>
              <Text style={styles.donutText}>Complete</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Fee Breakdown</Text>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tuition</Text>
            <Text style={styles.breakdownValue}>70%</Text>
          </View>
          <ProgressBar progress={70} color={PRIMARY_COLOR} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Laboratory</Text>
            <Text style={styles.breakdownValue}>15%</Text>
          </View>
          <ProgressBar progress={15} color={SUCCESS_COLOR} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Development</Text>
            <Text style={styles.breakdownValue}>8%</Text>
          </View>
          <ProgressBar progress={8} color={WARNING_COLOR} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Library</Text>
            <Text style={styles.breakdownValue}>5%</Text>
          </View>
          <ProgressBar progress={5} color={DANGER_COLOR} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Other Fees</Text>
            <Text style={styles.breakdownValue}>2%</Text>
          </View>
          <ProgressBar progress={2} color="#9c27b0" />
        </View>

        <View style={styles.yearProgressSection}>
          <Text style={styles.yearProgressTitle}>Progress by Semester</Text>
          {[
            { year: 1, semester: 1, completion: 100 },
            { year: 1, semester: 2, completion: 100 },
            { year: 2, semester: 1, completion: 75 },
            { year: 2, semester: 2, completion: 50 },
            { year: 3, semester: 1, completion: 0 },
            { year: 3, semester: 2, completion: 0 },
          ].map((semester) => (
            <View
              key={`${semester.year}-${semester.semester}`}
              style={styles.semesterCard}
            >
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterTitle}>
                  Year {semester.year}, Semester {semester.semester}
                </Text>
                <Text style={styles.semesterCompletion}>
                  {semester.completion}%
                </Text>
              </View>
              <ProgressBar
                progress={semester.completion}
                color={PRIMARY_COLOR}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
