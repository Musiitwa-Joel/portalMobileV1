import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppContext from "../../app/context/AppContext";
import formatDateString from "../../app/utils/formatDateToDateAndTime";

type Registration = {
  study_yr: number;
  sem: number;
  acc_yr_title: string;
  registered_user?: {
    staff_name: string;
  };
  date: string;
  provisional: number;
};

const StudentRegistrationTasks = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { studentFile } = useContext(AppContext);

  const theme = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    cardBackground: isDarkMode ? "#2a2a2a" : "#f0f7ff",
    textColor: isDarkMode ? "#ffffff" : "#333333",
    primaryColor: "#1a7de7",
    secondaryTextColor: isDarkMode ? "#b0b0b0" : "#666666",
    timelineColor: "#1a7de7",
    ribbonGreen: "#52c41a",
    ribbonBlue: "#1890ff",
  };

  const registrationHistory: Registration[] =
    studentFile?.registration_history || [];

  const RegistrationStatusRibbon = ({
    registration,
  }: {
    registration: Registration;
  }) => (
    <View
      style={[
        styles.ribbon,
        {
          backgroundColor:
            registration.provisional === 1
              ? theme.ribbonGreen
              : theme.ribbonBlue,
        },
      ]}
    >
      <Text style={styles.ribbonText}>
        {registration.provisional === 1
          ? "Provisional Registration"
          : "Registered"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {registrationHistory.map(
          (registration: Registration, index: number) => (
            <View
              key={index}
              style={[
                styles.taskCard,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <RegistrationStatusRibbon registration={registration} />
              <View style={styles.timeline}>
                <View
                  style={[
                    styles.timelineLine,
                    { backgroundColor: theme.timelineColor },
                  ]}
                />
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: theme.timelineColor },
                  ]}
                />
              </View>
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <Text
                    style={[styles.taskTitle, { color: theme.primaryColor }]}
                  >
                    Year {registration.study_yr}, Semester {registration.sem} (
                    {registration.acc_yr_title})
                  </Text>
                </View>
                <View style={styles.taskDetails}>
                  <View style={styles.timeRow}>
                    <Ionicons
                      name="person-outline"
                      size={16}
                      color={theme.secondaryTextColor}
                    />
                    <Text
                      style={[
                        styles.scheduleText,
                        { color: theme.secondaryTextColor },
                      ]}
                    >
                      Registered by:{" "}
                      {registration.registered_user
                        ? registration.registered_user.staff_name
                        : "SYSTEM"}
                    </Text>
                  </View>
                  <View style={styles.timeRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={theme.secondaryTextColor}
                    />
                    <Text
                      style={[
                        styles.timeRequired,
                        { color: theme.secondaryTextColor },
                      ]}
                    >
                      {formatDateString(Number.parseInt(registration.date))}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity style={styles.progressButton}>
                    <Text style={styles.progressButtonText}>Exam Permit</Text>
                    <Ionicons
                      name="cloud-download-outline"
                      size={14}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  content: {
    flex: 1,
    padding: 16,
  },

  taskCard: {
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
    gap: 12,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  taskDetails: {
    gap: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scheduleText: {
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  timeRequired: {
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  progressButton: {
    backgroundColor: "#1a7de7",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    gap: 4,
  },
  progressButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a7de7",
    borderRadius: 25,
    padding: 12,
    marginTop: 8,
    gap: 8,
  },

  timeline: {
    width: 20,
    alignItems: "center",
    marginRight: 16,
  },
  timelineLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#1a7de7",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1a7de7",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  ribbon: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    zIndex: 1,
  },
  ribbonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "SharpSansBold",
  },
});

export default StudentRegistrationTasks;
