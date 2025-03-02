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
import { useRouter } from "expo-router";

const PRIMARY_COLOR = "#1a7de7";
const { width } = Dimensions.get("window");

interface FinancialMetric {
  title: string;
  amount: string;
  type: "blue" | "green" | "orange" | "purple";
}

interface ActivityItem {
  id: string;
  title: string;
  percentage: string;
  amount: string;
  date: string;
}

export default function DashboardScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f8fafc",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: isDark ? "#000" : "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      elevation: 5,
    },

    iconButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDark ? "#1a2234" : "#f8fafc",
    },
    mainCardContainer: {
      margin: 16,
      borderRadius: 24,
      overflow: "hidden",
    },
    mainCard: {
      padding: 20,
    },
    decorativeCircle: {
      position: "absolute",
      borderRadius: 100,
      opacity: 0.2,
    },
    balanceTitle: {
      color: isDark ? "#8f9bba" : "#fff",
      marginBottom: 8,
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    balanceAmount: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    goalsText: {
      color: isDark ? "#8f9bba" : "rgba(255,255,255,0.8)",
      fontSize: 14,
    },
    metricsContainer: {
      marginHorizontal: 16,
      gap: 12,
    },
    metricsRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
    },
    metricCard: {
      flex: 1,
      padding: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    metricCardblue: {
      backgroundColor: isDark ? "#1a3a6d" : "#e6f2ff",
    },
    metricCardgreen: {
      backgroundColor: isDark ? "#1a5d3a" : "#e6fff0",
    },
    metricCardorange: {
      backgroundColor: isDark ? "#6d4d1a" : "#fff5e6",
    },
    metricCardpurple: {
      backgroundColor: isDark ? "#4d1a6d" : "#f5e6ff",
    },
    metricTitle: {
      color: isDark ? "#ffffff" : "#333333",
      marginBottom: 4,
      fontSize: 14,
      fontFamily: "SharpSansNo1",
    },
    metricAmount: {
      fontSize: 15,
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#000000",
      fontFamily: "SharpSansBold",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 16,
      marginTop: 32,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    seeAll: {
      color: PRIMARY_COLOR,
      fontWeight: "600",
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 16,
    },
    gridItem: {
      width: (width - 48) / 3 - 8,
      aspectRatio: 1,
      padding: 12,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 16,
    },
    gridItemPressed: {
      opacity: 0.7,
    },
    gridItemContent: {
      flex: 1,
      justifyContent: "space-between",
    },
    gridItemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? "rgba(26,125,231,0.1)" : "rgba(26,125,231,0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    gridItemText: {
      color: isDark ? "#fff" : "#000",
      fontSize: 13,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
    gridItemSubtext: {
      color: isDark ? "#8f9bba" : "#666",
      fontSize: 10,
      marginTop: 2,
      fontFamily: "SharpSansNo1",
    },
    activityContainer: {
      marginHorizontal: 16,
      backgroundColor: isDark ? "#1a2234" : "#fff",
      borderRadius: 20,
      padding: 16,
      marginTop: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    activityItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    },
    activityLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    activityIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? "rgba(26,125,231,0.1)" : "rgba(26,125,231,0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    activityInfo: {
      marginLeft: 12,
      flex: 1,
    },
    activityTitle: {
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 4,
    },
    activityMeta: {
      color: isDark ? "#8f9bba" : "#666",
      fontSize: 12,
    },
    activityAmount: {
      color: "#ff4444",
      fontWeight: "600",
      fontSize: 16,
    },
  });

  const financialMetrics: FinancialMetric[] = [
    {
      title: "Total invoice amount",
      amount: "UGX 12,000,000.00",
      type: "blue",
    },
    {
      title: "Total inv. amount paid",
      amount: "UGX 8,200,000.00",
      type: "green",
    },
    {
      title: "Total inv. amount due",
      amount: "UGX 4,800,000.00",
      type: "orange",
    },
    {
      title: "% completion",
      amount: "68.00%",
      type: "purple",
    },
  ];

  const gridItems = [
    {
      title: "Ledger",
      icon: "book-outline",
      subtitle: "Track records",
      route: "/ledger",
    },
    {
      title: "Invoices",
      icon: "receipt-outline",
      subtitle: "Manage bills",
      route: "/invoices",
    },
    {
      title: "Transactions",
      icon: "swap-horizontal-outline",
      subtitle: "View history",
      route: "/transactions",
    },
    {
      title: "Fees Structure",
      icon: "cash-outline",
      subtitle: "Check rates",
      route: "/fees-structure",
    },
    {
      title: "Statistics",
      icon: "stats-chart-outline",
      subtitle: "Analytics",
      route: "/statistics",
    },
    {
      title: "Refund",
      icon: "arrow-undo-outline",
      subtitle: "Request refunds",
      route: "/refunds",
    },
  ];

  const handleGridItemPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainCardContainer}>
          <LinearGradient
            colors={[PRIMARY_COLOR, "#1a4ed7"]}
            style={styles.mainCard}
          >
            <View
              style={[
                styles.decorativeCircle,
                {
                  width: 200,
                  height: 200,
                  backgroundColor: "#fff",
                  top: -100,
                  right: -100,
                },
              ]}
            />
            <View
              style={[
                styles.decorativeCircle,
                {
                  width: 150,
                  height: 150,
                  backgroundColor: "#fff",
                  bottom: -50,
                  left: -50,
                },
              ]}
            />
            <Text style={styles.balanceTitle}>Available account balance</Text>
            <Text style={styles.balanceAmount}>UGX 1,500,000</Text>
            {/* <Text style={styles.goalsText}>5 out of 6 goals achieved</Text> */}
          </LinearGradient>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            {financialMetrics.slice(0, 2).map((metric, index) => (
              <View
                key={index}
                style={[styles.metricCard, styles[`metricCard${metric.type}`]]}
              >
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricAmount}>{metric.amount}</Text>
              </View>
            ))}
          </View>
          <View style={styles.metricsRow}>
            {financialMetrics.slice(2, 4).map((metric, index) => (
              <View
                key={index + 2}
                style={[styles.metricCard, styles[`metricCard${metric.type}`]]}
              >
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricAmount}>{metric.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Financial Data 💰📊</Text>
        </View>

        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              activeOpacity={0.7}
              onPress={() => handleGridItemPress(item.route)}
            >
              <View style={styles.gridItemContent}>
                <View style={styles.gridItemIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={PRIMARY_COLOR}
                  />
                </View>
                <View>
                  <Text style={styles.gridItemText}>{item.title}</Text>
                  <Text style={styles.gridItemSubtext}>{item.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}
