import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MY_RESULTS } from "../gql/queries";
import LoadingModal from "@/components/LoadingModal";

// Define the Result interface
interface Result {
  study_yr: number;
  semester: number;
  acc_yr_title: string;
  course_unit_code: string;
  course_unit_title: string;
  final_mark: number;
  grade: string;
  GPA: number;
  CGPA: number;
}

// Extend the Result interface to include a key property
interface EnhancedResult extends Result {
  key: string;
}

// Define the structure for categorized results
interface CategorizedResults {
  [key: string]: EnhancedResult[];
}

const ResultsScreen: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_RESULTS);
  const [categorizedResults, setCategorizedResults] =
    useState<CategorizedResults>({});
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (data?.my_results?.student_marks) {
      const results: Result[] = data.my_results.student_marks;
      const categorized: CategorizedResults = {};

      results.forEach((result) => {
        const key = `${result.study_yr}-${result.semester}-${result.acc_yr_title}`;
        if (!categorized[key]) {
          categorized[key] = [];
        }
        categorized[key].push({
          ...result,
          key: result.course_unit_code, // Add unique key here
        });
      });

      setCategorizedResults(categorized);
      // console.log(categorized);
    }
  }, [data]); // Runs only when the data changes

  console.log("loading...", loading);
  if (loading) {
    return <LoadingModal message="Loading Student Results..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderSemesterTables = () => {
    return Object.entries(categorizedResults)
      .sort(([keyA], [keyB]) => {
        const [yearA, semA] = keyA.split("-");
        const [yearB, semB] = keyB.split("-");
        return yearA === yearB
          ? Number(semA) - Number(semB)
          : Number(yearA) - Number(yearB);
      })
      .map(([key, semesterData]) => {
        const [year, semester, academicYear] = key.split("-");
        return (
          <View key={key} style={styles.semesterContainer}>
            <Text style={[styles.semesterTitle, isDark && styles.darkText]}>
              YEAR {year} - SEMESTER {semester} - {academicYear}
            </Text>
            {semesterData.map((course) => {
              // Check if the grade is 'F' and apply a red color to the course title, mark, and grade
              const isRetake = course.grade === "F";
              const retakeTextStyle = isRetake ? { color: "red" } : {};

              return (
                <View key={course.key} style={styles.courseRow}>
                  <Text
                    style={[
                      styles.courseTitle,
                      isDark && styles.darkText,
                      retakeTextStyle,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {course.course_unit_title}
                  </Text>
                  <Text
                    style={[
                      styles.courseMark,
                      isDark && styles.darkText,
                      retakeTextStyle,
                    ]}
                  >
                    {course.final_mark}
                  </Text>
                  <Text
                    style={[
                      styles.courseGrade,
                      isDark && styles.darkText,
                      retakeTextStyle,
                    ]}
                  >
                    {course.grade}
                  </Text>
                </View>
              );
            })}
            <View style={styles.footerContainer}>
              <Text style={[styles.footerText, isDark && styles.darkText]}>
                GPA: {semesterData[0].GPA}
              </Text>
              <Text style={[styles.footerText, isDark && styles.darkText]}>
                CGPA: {semesterData[0].CGPA}
              </Text>
            </View>
          </View>
        );
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, isDark && styles.darkContainer]}
    >
      {renderSemesterTables()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  semesterContainer: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#8B5CF6", // Violet border color
    borderRadius: 8, // Optional: to give a rounded edge
  },
  semesterTitle: {
    fontSize: 18,
    fontFamily: "SharpSansBold",
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0832b7",
  },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  courseTitle: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
    fontFamily: "SharpSansNo1",
  },
  courseMark: {
    width: 40,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  courseGrade: {
    width: 40,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "SharpSansBold",
  },
  darkText: {
    color: "#fff",
  },
});

export default ResultsScreen;
