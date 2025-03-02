import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import AppContext from "../../app/context/AppContext";
import { AuthContext } from "../../app/context/AuthContext";
import { useRouter } from "expo-router";

interface ProfileData {
  name: string;
  studentnumber: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  school: string;
}

interface MenuItem {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  content: Array<{
    label: string;
    value: string;
  }> | null;
  onTap?: (() => void) | null;
}

const Biodata: React.FC = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { studentFile } = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const isDarkMode = colorScheme === "dark";
  const [expandedItem, setExpandedItem] = useState<string>(
    "Personal Information"
  );
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

  // console.log("Student file", studentFile);

  const profileData: ProfileData = {
    name: `${studentFile.biodata.surname} ${studentFile.biodata.other_names}`,
    studentnumber: studentFile.student_no,
    email: studentFile.biodata.email,
    phone: studentFile.biodata.phone_no,
    address: studentFile.biodata.district_of_birth,
    avatar: `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentFile.student_no}`,
    school: studentFile.school,
  };

  const formatYear = (year: number | string) => {
    // Convert the year to a number (in case it's passed as a string)
    const numericYear = Number(year);

    if (numericYear === 1) return "1st year";
    if (numericYear === 2) return "2nd year";
    if (numericYear === 3) return "3rd year";
    // For year 4 and onward
    return `${numericYear}th Year`;
  };

  const getResidenceStatus = (is_Resident: any) => {
    return Boolean(is_Resident) ? "Resident" : "Non-Resident";
  };

  const getValue = (value: string | null | undefined) => {
    if (value === undefined || value === null || value === "") {
      return "N/A";
    }
    return value;
  };

  const menuItems: MenuItem[] = [
    {
      icon: "account",
      title: "Personal Information",
      content: [
        {
          label: "Name",
          value:
            studentFile.biodata.surname + " " + studentFile.biodata.other_names,
        },
        { label: "Email", value: getValue(profileData.email) },
        { label: "Phone", value: getValue(profileData.phone) },
        { label: "Address", value: getValue(profileData.address) },
        {
          label: "Academic Year",
          value: getValue(studentFile.current_info.current_acc_yr),
        },
        {
          label: "Residency",
          value: getResidenceStatus(studentFile.invoices.is_resident),
        },
      ],
    },
    {
      icon: "school",
      title: "Education Information",

      content: [
        {
          label: "School",
          value: getValue(studentFile.course_details.course.school.school_title)
            .toLowerCase()
            .replace(/\b\w/g, (char: string) => char.toUpperCase()),
        },
        {
          label: "Program",
          value: getValue(studentFile.course_details.course.course_title)
            .toLowerCase()
            .replace(/\b\w/g, (char: string) => char.toUpperCase()),
        },
        {
          label: "Academic Year",
          value: getValue(studentFile.current_info.current_acc_yr),
        },
        {
          label: "Year of Study",
          value: formatYear(
            getValue(studentFile.current_info.recent_enrollment.study_yr)
          ),
        },
        {
          label: "Current Semester",
          value: getValue(studentFile.current_info.recent_enrollment.sem),
        },
      ],
    },
    {
      icon: "shield-lock",
      title: "Login and security",
      content: [
        { label: "Last Password Change", value: "3 months ago" },
        { label: "Active Sessions", value: "2 devices" },
      ],
    },
    {
      icon: "card-account-details",
      title: "Digital ID",
      content: [],
    },
    {
      icon: "logout",
      title: "Log Out",
      content: null,
      onTap: () => {
        authContext?.logout();
        router.navigate("/");
      },
    },
  ];

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
    cardBackground: isDarkMode ? "#242323" : "#fff",
    text: isDarkMode ? "#fff" : "#000",
    subText: isDarkMode ? "#b0b0b0" : "#666",
    border: isDarkMode ? "#333" : "#eaeaea",
    menuItem: isDarkMode ? "#1a1a1a" : "#fff",
    editButton: isDarkMode ? "#333" : "#f0f0f0",
    editButtonText: isDarkMode ? "#4da6ff" : "#007AFF",
    icon: isDarkMode ? "#b0b0b0" : "#333",
    input: isDarkMode ? "#333" : "#f0f0f0",
    modalBackground: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
    idCardBackground: isDarkMode ? "#333" : "#fff",
    idCardText: isDarkMode ? "#fff" : "#000",
    idCardTitle: isDarkMode ? "#4da6ff" : "#1a237e",
    idCardBorder: isDarkMode ? "#555" : "#ddd",
  };

  const MenuItem: React.FC<MenuItem & { isLast?: boolean }> = ({
    icon,
    title,
    content,
    isLast = false,
    onTap,
  }) => {
    const isExpanded = expandedItem === title;
    const showEditButton = title === "Personal Information";

    return (
      <View
        style={[
          styles.menuItemWrapper,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <TouchableOpacity
          style={styles.menuItem}
          onPress={
            onTap
              ? onTap
              : () => setExpandedItem(expandedItem === title ? "" : title)
          }
        >
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.icon} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              {title}
            </Text>
          </View>
          <View style={styles.sectionHeaderRight}>
            {showEditButton && (
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: colors.editButton },
                ]}
              >
                <Text
                  style={[
                    styles.editButtonText,
                    { color: colors.editButtonText },
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            )}
            {content && (
              <Feather
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.subText}
              />
            )}
          </View>
        </TouchableOpacity>
        {isExpanded && content && (
          <View style={styles.menuItemContent}>
            {title === "Digital ID" ? (
              <View style={styles.idCardContainer}>
                <View
                  style={[
                    styles.idCard,
                    {
                      backgroundColor: colors.idCardBackground,
                      borderColor: colors.idCardBorder,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.idTitle,
                      { backgroundColor: colors.idCardTitle },
                    ]}
                  >
                    <Text
                      style={[
                        styles.idTitleText,
                        { color: colors.idCardBackground },
                      ]}
                    >
                      STUDENT IDENTIFICATION CARD
                    </Text>
                  </View>

                  <View style={styles.idDetails}>
                    <View style={styles.idDetailsLeft}>
                      <View style={styles.idField}>
                        <Text
                          style={[styles.idLabel, { color: colors.idCardText }]}
                        >
                          Name:
                        </Text>
                        <Text
                          style={[styles.idValue, { color: colors.idCardText }]}
                        >
                          {profileData.name}
                        </Text>
                      </View>
                      <View style={styles.idField}>
                        <Text
                          style={[styles.idLabel, { color: colors.idCardText }]}
                        >
                          Student No:
                        </Text>
                        <Text
                          style={[styles.idValue, { color: colors.idCardText }]}
                        >
                          {profileData.studentnumber}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={styles.idField}>
                          <Text
                            style={[
                              styles.idLabel,
                              { color: colors.idCardText },
                            ]}
                          >
                            School:
                          </Text>
                          <Text
                            style={[
                              styles.idValue,
                              { color: colors.idCardText },
                            ]}
                          >
                            {
                              studentFile.course_details.course.school
                                .school_code
                            }
                          </Text>
                        </View>
                        <View style={[styles.idField, { marginLeft: 30 }]}>
                          <Text
                            style={[
                              styles.idLabel,
                              { color: colors.idCardText },
                            ]}
                          >
                            Programme:
                          </Text>
                          <Text
                            style={[
                              styles.idValue,
                              { color: colors.idCardText },
                            ]}
                          >
                            {studentFile.course_details.course.course_code}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.idPhoto}>
                      <Image
                        source={{ uri: profileData.avatar }}
                        style={styles.idPhotoImage}
                      />
                      <View style={styles.qrCodeContainer}>
                        <QRCode
                          value={profileData.studentnumber}
                          size={50}
                          color={colors.idCardText}
                          backgroundColor={colors.idCardBackground}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : content ? (
              content.map(({ label, value }, index) => (
                <View key={index} style={styles.contentRow}>
                  <Text style={[styles.contentLabel, { color: colors.text }]}>
                    {label}
                    <Text style={styles.contentColon}>: </Text>
                  </Text>
                  <Text style={[styles.contentValue, { color: colors.text }]}>
                    {value}
                  </Text>
                </View>
              ))
            ) : null}
            {title === "Login and security" && (
              <TouchableOpacity
                style={[
                  styles.changePasswordButton,
                  { backgroundColor: colors.editButton },
                ]}
                onPress={() => setPasswordModalVisible(true)}
              >
                <Text
                  style={[
                    styles.changePasswordButtonText,
                    { color: colors.editButtonText },
                  ]}
                >
                  Change Password
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const PasswordChangeModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
  }> = ({ isVisible, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New password and confirm password do not match.");
        return;
      }

      Alert.alert("Success", "Password changed successfully!", [
        {
          text: "OK",
          onPress: () => {
            onClose();
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]);
    };

    return (
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.modalBackground },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Change Password
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              placeholder="Current Password"
              placeholderTextColor={colors.subText}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              placeholder="New Password"
              placeholderTextColor={colors.subText}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.text },
              ]}
              placeholder="Confirm New Password"
              placeholderTextColor={colors.subText}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.editButton }]}
                onPress={handleSave}
              >
                <Text
                  style={[styles.buttonText, { color: colors.editButtonText }]}
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => (
          <MenuItem
            key={item.title}
            {...item}
            isLast={index === menuItems.length - 1}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: profileData.avatar }}
                  style={styles.avatar}
                />
              </View>
            </View>
            <View style={styles.namesection}>
              <Text style={[styles.name, { color: colors.text }]}>
                {profileData.name}
              </Text>
              <Text style={[styles.studentnumber, { color: colors.subText }]}>
                {profileData.studentnumber}
              </Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      />

      <PasswordChangeModal
        isVisible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  namesection: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "red",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "SharpSansBold",
  },
  studentnumber: {
    fontSize: 16,
    fontFamily: "SharpSansNo1",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
    marginLeft: 12,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SharpSansNo1",
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  menuItemWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
    marginLeft: 12,
  },
  menuItemContent: {
    padding: 16,
    paddingTop: 0,
  },
  changePasswordButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  changePasswordButtonText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SharpSansNo1",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "SharpSansBold",
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SharpSansNo1",
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "SharpSansNo1",
    fontWeight: "600",
  },
  contentRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  contentLabel: {
    fontSize: 14,
    fontWeight: "600",
    width: 150,
    fontFamily: "SharpSansBold",
  },
  contentColon: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  contentValue: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
    flex: 1,
  },
  idCardContainer: {
    alignItems: "center",
    padding: 10,
  },
  idCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
  },
  idCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  idTitle: {
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  idTitleText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "SharpSansBold",
  },
  idDetails: {
    flexDirection: "row",
    marginBottom: 16,
  },
  idDetailsLeft: {
    flex: 1,
    marginRight: 16,
  },
  idField: {
    marginBottom: 12,
  },
  idLabel: {
    fontSize: 12,
    color: "#000",
    fontFamily: "SharpSansBold",
    fontWeight: "500",
  },
  idValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    fontFamily: "SharpSansNo1",
  },
  idPhoto: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  idPhotoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 60,
  },
  qrCodeContainer: {
    alignItems: "baseline",
    marginTop: 1,
  },
  editableInput: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default Biodata;
