import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomToast from "../CustomToast";

type CourseStatus =
  | "Normal Paper"
  | "Retake Paper"
  | "Missed Paper"
  | "Supplementary Paper";

const ResultsScreen: React.FC = () => {
  const [categorizedResults, setCategorizedResults] = useState({
    "1-1": [
      { key: "COURSE101", course_unit_title: "INTRODUCTION TO PROGRAMMING" },
      { key: "COURSE102", course_unit_title: "MATHEMATICS FOR COMPUTING" },
      { key: "COURSE103", course_unit_title: "COMPUTER ARCHITECTURE" },
      { key: "COURSE104", course_unit_title: "DATABASE SYSTEMS" },
      {
        key: "COURSE105",
        course_unit_title: "SOFTWARE ENGINEERING PRINCIPLES",
      },
      { key: "COURSE106", course_unit_title: "OPERATING SYSTEMS" },
    ],
    "1-2": [
      { key: "COURSE201", course_unit_title: "DATA STRUCTURES AND ALGORITHMS" },
      { key: "COURSE202", course_unit_title: "NETWORK FUNDAMENTALS" },
      { key: "COURSE203", course_unit_title: "OBJECT-ORIENTED PROGRAMMING" },
      { key: "COURSE204", course_unit_title: "WEB DEVELOPMENT" },
      { key: "COURSE205", course_unit_title: "MOBILE APPLICATION DEVELOPMENT" },
      { key: "COURSE206", course_unit_title: "HUMAN-COMPUTER INTERACTION" },
    ],
    "2-1": [
      { key: "COURSE301", course_unit_title: "ADVANCED DATABASE MANAGEMENT" },
      { key: "COURSE302", course_unit_title: "COMPUTER NETWORKS" },
      {
        key: "COURSE303",
        course_unit_title: "SOFTWARE TESTING AND QUALITY ASSURANCE",
      },
      { key: "COURSE304", course_unit_title: "CYBERSECURITY PRINCIPLES" },
      { key: "COURSE305", course_unit_title: "ARTIFICIAL INTELLIGENCE" },
      { key: "COURSE306", course_unit_title: "CLOUD COMPUTING" },
    ],
  });

  const [selectedCourse, setSelectedCourse] = useState<null | {
    key: string;
    course_unit_title: string;
  }>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CourseStatus | "">("");
  const [isSelectionValid, setIsSelectionValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const statusOptions = [
    { key: "1", value: "Normal Paper" },
    { key: "2", value: "Retake Paper" },
    { key: "3", value: "Missed Paper" },
    { key: "4", value: "Supplementary Paper" },
  ];

  const toggleModal = (course: { key: string; course_unit_title: string }) => {
    setSelectedCourse(course);
    setSelectedStatus("");
    setIsSelectionValid(false);
    setModalVisible(true);
  };

  const handleAdd = () => {
    if (isSelectionValid) {
      setModalVisible(false);
      setShowToast(true);
    }
  };

  const renderSemesterTables = () => {
    return Object.entries(categorizedResults).map(([key, semesterData]) => {
      const [year, semester] = key.split("-");
      return (
        <View key={key} style={styles.semesterContainer}>
          <Text style={[styles.semesterTitle, isDark && styles.darkText]}>
            YEAR {year} - SEMESTER {semester}
          </Text>
          {semesterData.map((course) => (
            <TouchableOpacity
              key={course.key}
              style={styles.courseRow}
              onPress={() => toggleModal(course)}
            >
              <Text
                style={[styles.courseTitle, isDark && styles.darkText]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {course.course_unit_title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    });
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <CustomToast
        visible={showToast}
        message="Successfully added module!"
        onHide={() => setShowToast(false)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSemesterTables()}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeader} numberOfLines={2}>
                    {selectedCourse?.course_unit_title}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeIconButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#0832b7" />
                  </TouchableOpacity>
                </View>
                <View style={styles.selectContainer}>
                  <Text style={styles.selectLabel}>Course Status:</Text>
                  <SelectList
                    setSelected={(val: CourseStatus) => {
                      setSelectedStatus(val);
                      setIsSelectionValid(!!val);
                    }}
                    data={statusOptions}
                    save="value"
                    placeholder="Select status"
                    search={false}
                    boxStyles={styles.selectBox}
                    inputStyles={styles.selectInput}
                    dropdownStyles={styles.selectDropdown}
                    dropdownItemStyles={styles.selectDropdownItem}
                    dropdownTextStyles={styles.selectDropdownText}
                  />
                  <Text style={styles.helperText}>
                    Please select a course status
                  </Text>
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.addButtonIOS,
                        !isSelectionValid && styles.disabledButton,
                      ]}
                      onPress={handleAdd}
                      disabled={!isSelectionValid}
                    >
                      <Ionicons
                        name="add"
                        size={22}
                        color={isSelectionValid ? "#0832b7" : "#A0AEC0"}
                      />
                      <Text
                        style={[
                          styles.addButtonTextIOS,
                          !isSelectionValid && styles.disabledButtonText,
                        ]}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  semesterContainer: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#8B5CF6",
    borderRadius: 8,
  },
  semesterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "SharpSansBold",
    color: "#0832b7",
  },
  courseRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  courseTitle: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  darkText: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  modalHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "SharpSansBold",
    marginRight: 24,
  },
  modalContentTextContainer: {
    marginBottom: 20,
  },
  modalContentText: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
    color: "#333",
    textAlign: "center",
  },
  selectContainer: {
    width: "100%",
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
    color: "#333",
    marginBottom: 5,
  },
  selectBox: {
    borderColor: "#0832b7",
    borderRadius: 4,
  },
  selectInput: {
    color: "#333",
    fontFamily: "SharpSansNo1",
  },
  selectDropdown: {
    borderColor: "#0832b7",
    borderRadius: 4,
  },
  selectDropdownItem: {
    paddingVertical: 8,
  },
  selectDropdownText: {
    color: "#333",
    fontFamily: "SharpSansNo1",
  },
  closeIconButton: {
    padding: 4,
  },
  addButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  addButtonIOS: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonTextIOS: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "SharpSansNo1",
    color: "#0832b7",
  },
  addButtonAndroid: {
    backgroundColor: "#0832b7",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#A0AEC0",
  },
  helperText: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
    fontFamily: "SharpSansNo1",
  },
});

export default ResultsScreen;
