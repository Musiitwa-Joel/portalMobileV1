import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface TimelineItem {
  status: string;
  date: string;
  completed: boolean;
  icon: "checkmark-circle" | "shield-checkmark" | "car" | "cash";
}

export default function ReturnTrackingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    background: isDark ? "#1a1a1a" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    secondaryText: isDark ? "#a0a0a0" : "#666666",
    primary: "#1a7de7",
    accent: "#5C5CFF",
    border: isDark ? "#333333" : "#e0e0e0",
    cardBg: isDark ? "#2c2c2c" : "#f5f5f5",
  };

  const timelineData: TimelineItem[] = [
    {
      status: "Refund Requested",
      date: "Fri, 29th Apr 22, 05:30 PM",
      completed: true,
      icon: "checkmark-circle",
    },
    {
      status: "Refund Received",
      date: "Sat, 30th Apr 22, 07:15 PM",
      completed: true,
      icon: "shield-checkmark",
    },
    {
      status: "Refund being processed",
      date: "Tue, 3 May 22, 10:04 AM",
      completed: true,
      icon: "car",
    },
    {
      status: "Refund Received",
      date: "Expected Mon, 4th May 22, 10:00 AM",
      completed: false,
      icon: "cash",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 30,
    },
    iconContainer: {
      width: 80,
      height: 80,
      backgroundColor: theme.cardBg,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      overflow: "hidden",
    },
    returnIcon: {
      position: "absolute",
      top: -1,
      right: -1,
      backgroundColor: "#ff4444",
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    orderId: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 15,
      fontFamily: "SharpSansNo1",
    },
    backButton: {
      backgroundColor: theme.accent,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
      width: "80%",
      alignItems: "center",
    },
    backButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "SharpSansNo1",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 20,
      paddingLeft: 16,
      fontFamily: "SharpSansBold",
    },
    timeline: {
      marginTop: 20,
      paddingLeft: 16,
    },
    timelineItem: {
      flexDirection: "row",
      marginBottom: 30,
    },
    timelineLeft: {
      width: 30,
      alignItems: "center",
    },
    timelineDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    timelineLine: {
      width: 2,
      flex: 1,
      backgroundColor: theme.border,
      marginTop: 8,
    },
    timelineContent: {
      flex: 1,
      marginLeft: 15,
    },
    timelineStatus: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 4,
      fontFamily: "SharpSansBold",
      lineHeight: 20,
    },
    timelineDate: {
      fontSize: 14,
      color: theme.secondaryText,
      fontFamily: "SharpSansNo1",
    },
    viewAll: {
      marginTop: 10,
      alignItems: "center",
    },
    viewAllText: {
      color: theme.primary,
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    productImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  });
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
              }}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.orderId}>Refund Request ID - 125878695H586</Text>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            style={styles.backButton}
          >
            <Text
              onPress={() => router.push("/dashboard")}
              style={styles.backButtonText}
            >
              Back to Dashboard
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Track Your Refund Request</Text>

        <View style={styles.timeline}>
          {timelineData.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    {
                      backgroundColor: item.completed
                        ? theme.primary
                        : theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.completed ? "checkmark" : item.icon}
                    size={16}
                    color="#ffffff"
                  />
                </View>
                {index < timelineData.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      {
                        backgroundColor: item.completed
                          ? theme.primary
                          : theme.border,
                      },
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatus}>{item.status}</Text>
                <Text style={styles.timelineDate}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/services")}
          style={styles.viewAll}
        >
          <Text
            onPress={() => router.push("/services")}
            style={styles.viewAllText}
          >
            Back to services
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
