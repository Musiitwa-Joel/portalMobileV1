import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

interface ProgramRequest {
  id: string;
  status: "Approved" | "Under review";
  timestamp: string;
  link: string;
}

const SAMPLE_REQUESTS: ProgramRequest[] = [
  {
    id: "#2443455",
    status: "Approved",
    timestamp: "1 month ago",
    link: "More details",
  },
  {
    id: "#2443465",
    status: "Under review",
    timestamp: "2 hrs ago",
    link: "More details",
  },
];

export default function RefundHistory() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#F5F5F5",
    },
    content: {
      padding: 16,
    },
    requestCard: {
      backgroundColor: isDark ? "#2C2C2E" : "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    requestId: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FFFFFF" : "#000000",
      fontFamily: "SharpSansBold",
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16,
    },
    approvedBadge: {
      backgroundColor: "#E8F5E9",
    },
    reviewBadge: {
      backgroundColor: "#FFF3E0",
    },
    approvedText: {
      color: "#2E7D32",
      fontSize: 14,
      fontWeight: "500",
      fontFamily: "SharpSansNo1",
    },
    reviewText: {
      color: "#F57C00",
      fontSize: 14,
      fontWeight: "500",
      fontFamily: "SharpSansNo1",
    },
    timestamp: {
      fontSize: 14,
      color: isDark ? "#8E8E93" : "#6B7280",
      marginTop: 4,
      fontFamily: "SharpSansNo1",
    },
    timestamp1: {
      fontSize: 14,
      color: isDark ? "#1E90FF" : "#0000EE",
      marginTop: 4,
      fontFamily: "SharpSansNo1",
      marginLeft: 10,
    },
    timeIcon: {
      marginRight: 4,
      opacity: 0.7,
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const renderStatus = (status: ProgramRequest["status"]) => {
    if (status === "Approved") {
      return (
        <View style={[styles.statusBadge, styles.approvedBadge]}>
          <Text style={styles.approvedText}>Approved</Text>
        </View>
      );
    }
    return (
      <View style={[styles.statusBadge, styles.reviewBadge]}>
        <Text style={styles.reviewText}>Under review</Text>
      </View>
    );
  };
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {SAMPLE_REQUESTS.map((request, index) => (
          <View key={index} style={styles.requestCard}>
            <View style={styles.header}>
              <Text style={styles.requestId}>Refund Request {request.id}</Text>
              {renderStatus(request.status)}
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timestamp}>{request.timestamp}</Text>
              {"\n"}{" "}
              <Text
                onPress={() => router.push("/refund_status")}
                style={styles.timestamp1}
              >
                {request.link}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
