import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  useColorScheme,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import { useQuery } from "@apollo/client";
import { LOAD_STUDENT_FILE } from "../gql/queries";
import LoadingModal from "@/components/LoadingModal";
import AppContext, { type AppContextType } from "../context/AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoursesScreen from "../../components/Bottom_tabs/CoursesScreen";
import NotificationsScreen from "../../components/Bottom_tabs/NotificationsScreen";
import ProfileScreen from "../../components/Bottom_tabs/ProfileScreen";

type Subject = {
  id: string;
  name: string;
  icon: string;
  iconFamily:
    | "MaterialCommunityIcons"
    | "FontAwesome"
    | "Ionicons"
    | "MaterialIcons";
  color: string;
};

const subjects: Subject[] = [
  {
    id: "1",
    name: "Generate PRT",
    icon: "generating-tokens",
    iconFamily: "MaterialIcons",
    color: "#dc7044",
  },
  {
    id: "2",
    name: "Registration",
    icon: "registered",
    iconFamily: "FontAwesome",
    color: "#7237ce",
  },
  {
    id: "3",
    name: "Enrollment",
    icon: "school-outline",
    iconFamily: "Ionicons",
    color: "#f8ac30",
  },
  {
    id: "4",
    name: "Results Hub",
    icon: "trophy",
    iconFamily: "FontAwesome",
    color: "#2593fc",
  },
  {
    id: "5",
    name: "My Finances",
    icon: "wallet-outline",
    iconFamily: "MaterialCommunityIcons",
    color: "#fc0d1b",
  },
  {
    id: "6",
    name: "Counselling",
    icon: "fitness",
    iconFamily: "Ionicons",
    color: "#e93696",
  },
  {
    id: "7",
    name: "Academic Calendar",
    icon: "calendar",
    iconFamily: "FontAwesome",
    color: "#0f7f12",
  },
  {
    id: "8",
    name: "My Services",
    icon: "cog",
    iconFamily: "FontAwesome",
    color: "#e4521b",
  },
  {
    id: "9",
    name: "E-voting",
    icon: "vote-outline",
    iconFamily: "MaterialCommunityIcons",
    color: "#0a4378",
  },
  {
    id: "10",
    name: "FAQ",
    icon: "help-circle-outline",
    iconFamily: "MaterialCommunityIcons",
    color: "#2c98f0",
  },
  {
    id: "11",
    name: "E-learning",
    icon: "laptop",
    iconFamily: "FontAwesome",
    color: "#1873a6",
  },
  {
    id: "12",
    name: "Suggestion Box",
    icon: "mail-outline",
    iconFamily: "Ionicons",
    color: "#65201b",
  },
];

const IconComponent = ({
  name,
  family,
  size,
  color,
}: {
  name: string;
  family: string;
  size: number;
  color: string;
}) => {
  switch (family) {
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case "FontAwesome":
      return <FontAwesome name={name} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} />;
    case "MaterialIcons":
      return <MaterialIcons name={name} size={size} color={color} />;
    default:
      return null;
  }
};

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { studentFile, setStudentFile } =
    useContext<AppContextType>(AppContext);
  const isDarkMode = colorScheme === "dark";

  const { error, loading, data } = useQuery(LOAD_STUDENT_FILE, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (error) {
      console.log("error", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setStudentFile(data.my_details);
      console.log("data", data);
    }
  }, [data, setStudentFile]);

  function HomeScreen() {
    return (
      <>
        {loading || !studentFile ? (
          <LoadingModal />
        ) : (
          <SafeAreaView
            style={[
              styles.container,
              { backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF" },
            ]}
          >
            <View style={styles.featuredContent}>
              <Text
                style={[
                  styles.featuredTitle,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
              >
                Hey,{" "}
                {studentFile.biodata.surname.charAt(0) +
                  studentFile.biodata.surname.slice(1).toLowerCase()}{" "}
                🖐️
                {"\n"}
                <Text style={styles.stud}>
                  Year {studentFile.current_info.recent_enrollment.study_yr}{" "}
                  Semester {studentFile.current_info.recent_enrollment.sem}
                </Text>
              </Text>

              <Image
                source={{
                  uri: `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentFile.student_no}`,
                }}
                style={styles.profileImage}
              />
            </View>

            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
            >
              <FlatList
                data={subjects}
                renderItem={renderSubjectItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={styles.subjectGrid}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    );
  }

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.subjectItem}
      onPress={() => {
        if (item.id === "1") {
          router.push("/generate_prt");
        } else if (item.id === "3") {
          router.push("/enrollment");
        } else if (item.id === "4") {
          router.push("/results");
        } else if (item.id === "2") {
          router.push("/registration");
        } else if (item.id === "5") {
          router.push("/finance");
        } else if (item.id === "7") {
          router.push("/calendar");
        } else if (item.id === "8") {
          router.push("/services");
        } else if (item.id === "10") {
          router.push("/faq");
        } else if (item.id === "6") {
          router.push("/counselling");
        }
      }}
    >
      <View style={[styles.subjectIconContainer, { borderColor: item.color }]}>
        <IconComponent
          name={item.icon}
          family={item.iconFamily}
          size={35}
          color={item.color}
        />
      </View>
      <Text
        style={[
          styles.subjectName,
          isDarkMode ? styles.darkText : styles.lightText,
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let iconFamily = "";

          if (route.name === "Dashboard") {
            iconName = "grid-outline";
            iconFamily = "Ionicons";
          } else if (route.name === "My Courses") {
            iconName = "book-open-variant";
            iconFamily = "MaterialCommunityIcons";
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
            iconFamily = "Ionicons";
          } else if (route.name === "Profile") {
            return studentFile ? (
              <Image
                source={{
                  uri: `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentFile.student_no}`,
                }}
                style={styles.userImage}
              />
            ) : (
              <IconComponent
                name="user"
                family="FontAwesome"
                size={size}
                color={color}
              />
            );
          }

          return iconName && iconFamily ? (
            <IconComponent
              name={iconName}
              family={iconFamily}
              size={size}
              color={color}
            />
          ) : null;
        },
        tabBarActiveTintColor: isDarkMode ? "#FFFFFF" : "#000000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          styles.bottomNav,
          isDarkMode ? styles.darkBottomNav : styles.lightBottomNav,
        ],
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="My Courses" component={CoursesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a237e",
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredContent: {
    padding: 16,
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    paddingTop: 0,
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  stud: {
    fontSize: 15,
    fontFamily: "SharpSansNo1",
  },
  featuredTitle: {
    fontSize: 24,
    fontFamily: "SharpSansBold",
    marginBottom: 12,
    paddingHorizontal: 5,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: "SharpSansBold",
  },
  subjectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  subjectItem: {
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginHorizontal: "1.5%",
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderStyle: "dotted",
    borderColor: "white",
    borderWidth: 1,
  },
  subjectName: {
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
    fontFamily: "SharpSansNo1",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  lightBottomNav: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  darkBottomNav: {
    backgroundColor: "#1a1a1a",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  lightText: {
    color: "#000000",
  },
  darkText: {
    color: "#FFFFFF",
  },
  userImage: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
});
