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

type Enrollment = {
  study_yr: string;
  sem: string;
  acc_yr_title: string;
  enrolled_by: string;
  datetime: string;
  enrollment_status: {
    id: string;
    title: string;
    color_code: string;
  };
  enrollment_token: string;
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
    newStudentColor: "#23cdfd",
  };

  const enrollmentHistory: Enrollment[] = studentFile?.enrollment_history || [];

  const EnrollmentStatusRibbon = ({
    enrollment,
  }: {
    enrollment: Enrollment;
  }) => (
    <View
      style={[
        styles.ribbon,
        {
          backgroundColor:
            enrollment.study_yr === "1" && enrollment.sem === "1"
              ? theme.newStudentColor
              : enrollment.enrollment_status.color_code,
        },
      ]}
    >
      <Text style={styles.ribbonText}>
        {enrollment.enrollment_status.title}
      </Text>
    </View>
  );

  const isNewStudent = (enrollment: Enrollment) =>
    enrollment.study_yr === "1" && enrollment.sem === "1";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {enrollmentHistory.map((enrollment: Enrollment, index: number) => (
          <View
            key={index}
            style={[styles.taskCard, { backgroundColor: theme.cardBackground }]}
          >
            <EnrollmentStatusRibbon enrollment={enrollment} />
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
                <Text style={[styles.taskTitle, { color: theme.textColor }]}>
                  Year {enrollment.study_yr}, Semester {enrollment.sem} (
                  {enrollment.acc_yr_title})
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
                    Enrolled by: {enrollment.enrolled_by}
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
                    {formatDateString(Number.parseInt(enrollment.datetime))}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.progressButton}>
                  <Text style={styles.progressButtonText}>Proof</Text>
                  <Ionicons
                    name="cloud-download-outline"
                    size={14}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  progressButton: {
    backgroundColor: "#1a7de7",
    borderRadius: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#1a7de7",
  },
  progressButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "SharpSansNo1",
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
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#1a7de7",
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
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "SharpSansBold",
  },
});

export default StudentRegistrationTasks;
