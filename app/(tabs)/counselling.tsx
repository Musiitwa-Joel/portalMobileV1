import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  FlatList,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { useRouter } from "expo-router"; // New import for navigation

import { StatusBar } from "expo-status-bar";
import {
  BookOpen,
  Briefcase,
  Users,
  PiggyBank,
  Home,
  Wine,
  Shield,
  HeartCrack,
  Brain,
  LucideIcon,
} from "lucide-react-native";

const PRIMARY_COLOR = "#1a7de7";

interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBackground: string;
}

const lightTheme: Theme = {
  background: "#F7F9FC",
  text: "#333333",
  primary: PRIMARY_COLOR,
  secondary: "#FFFFFF",
  accent: "#FF3B30",
  border: "#E1E1E8",
  cardBackground: "#FFFFFF",
};

const darkTheme: Theme = {
  background: "#1A1A1A",
  text: "#FFFFFF",
  primary: PRIMARY_COLOR,
  secondary: "rgba(255, 255, 255, 0.05)",
  accent: "#FF6B6B",
  border: "rgba(255, 255, 255, 0.1)",
  cardBackground: "rgba(255, 255, 255, 0.1)",
};

type IconStyleKey =
  | "Academic"
  | "Career"
  | "Interpersonal"
  | "Financial"
  | "Accommodation"
  | "Substance Abuse"
  | "Bullying"
  | "Trauma"
  | "Anxiety";

const iconStyles: Record<IconStyleKey, { color: string; background: string }> =
  {
    Academic: { color: "#4CAF50", background: "#E8F5E9" },
    Career: { color: "#2196F3", background: "#E3F2FD" },
    Interpersonal: { color: "#FF5722", background: "#FFEBEE" },
    Financial: { color: "#9C27B0", background: "#F3E5F5" },
    Accommodation: { color: "#795548", background: "#EFEBE9" },
    "Substance Abuse": { color: "#607D8B", background: "#ECEFF1" },
    Bullying: { color: "#FF9800", background: "#FFF3E0" },
    Trauma: { color: "#E91E63", background: "#FCE4EC" },
    Anxiety: { color: "#3F51B5", background: "#E8EAF6" },
  };

const ThemeContext = React.createContext<Theme>(lightTheme);

const useTheme = () => React.useContext(ThemeContext);

function Header() {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: theme.text }]}>
            MUSIITWA JOEL
          </Text>
          <Text style={[styles.profileLocation, { color: theme.text }]}>
            Student ID: 2000100121
          </Text>
        </View>
      </View>
    </View>
  );
}

function QuickAccess() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.quickAccessSection,
        colorScheme === "dark" ? styles.glassmorphism : null,
        {
          backgroundColor:
            colorScheme === "dark" ? theme.cardBackground : theme.secondary,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.emergencyButton, { backgroundColor: theme.accent }]}
      >
        <Text style={[styles.emergencyButtonText, { color: theme.background }]}>
          🆘 24/7 Crisis Support
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Appointments() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [scrollX, setScrollX] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 40;

  const upcomingAppointments = [
    {
      id: "1",
      counselor: "Dr. Susan Mary",
      specialty: "Academic Counselor",
      time: "9:30 am - 03 Sat",
      image:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100539",
    },
    {
      id: "2",
      counselor: "Dr. John Doe",
      specialty: "Career Advisor",
      time: "2:00 pm - 04 Sun",
      image:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100540",
    },
    {
      id: "3",
      counselor: "Dr. Jane Smith",
      specialty: "Mental Health Counselor",
      time: "11:00 am - 05 Mon",
      image:
        "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100541",
    },
  ];

  const extendedAppointments = [
    ...upcomingAppointments,
    ...upcomingAppointments,
    ...upcomingAppointments,
  ];

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        const nextScrollX = scrollX + cardWidth;
        if (nextScrollX >= cardWidth * upcomingAppointments.length * 2) {
          flatListRef.current.scrollToOffset({
            offset: cardWidth * upcomingAppointments.length,
            animated: false,
          });
          setScrollX(cardWidth * upcomingAppointments.length);
        } else {
          flatListRef.current.scrollToOffset({
            offset: nextScrollX,
            animated: true,
          });
          setScrollX(nextScrollX);
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [scrollX, cardWidth]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newScrollX = event.nativeEvent.contentOffset.x;
    setScrollX(newScrollX);

    if (newScrollX < cardWidth * upcomingAppointments.length) {
      flatListRef.current?.scrollToOffset({
        offset: newScrollX + cardWidth * upcomingAppointments.length,
        animated: false,
      });
    } else if (newScrollX >= cardWidth * upcomingAppointments.length * 2) {
      flatListRef.current?.scrollToOffset({
        offset: newScrollX - cardWidth * upcomingAppointments.length,
        animated: false,
      });
    }
  };

  const renderAppointment = ({ item, index }: { item: any; index: number }) => (
    <View
      style={[
        styles.appointmentCard,
        colorScheme === "dark" ? styles.glassmorphism : null,
        {
          backgroundColor:
            colorScheme === "dark" ? theme.cardBackground : theme.secondary,
          width: cardWidth - 20,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.counselorImage} />
      <View style={styles.appointmentInfo}>
        <Text style={[styles.counselorName, { color: theme.text }]}>
          {item.counselor}
        </Text>
        <Text style={[styles.counselorSpecialty, { color: theme.text }]}>
          {item.specialty}
        </Text>
        <Text style={[styles.appointmentTime, { color: theme.text }]}>
          {item.time}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.rescheduleButton, { backgroundColor: theme.primary }]}
      >
        <Text style={[styles.rescheduleText, { color: theme.background }]}>
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Counsellors
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: theme.primary }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={extendedAppointments}
        renderItem={renderAppointment}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        getItemLayout={(data, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
        initialScrollIndex={upcomingAppointments.length}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

function SupportServices() {
  const router = useRouter();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const screenWidth = Dimensions.get("window").width;
  const itemSize = (screenWidth - 80) / 3;

  const specializations: { title: IconStyleKey; icon: LucideIcon }[] = [
    { title: "Academic", icon: BookOpen },
    { title: "Career", icon: Briefcase },
    { title: "Interpersonal", icon: Users },
    { title: "Financial", icon: PiggyBank },
    { title: "Accommodation", icon: Home },
    { title: "Substance Abuse", icon: Wine },
    { title: "Bullying", icon: Shield },
    { title: "Trauma", icon: HeartCrack },
    { title: "Anxiety", icon: Brain },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Support Services
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: theme.primary }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.servicesGrid}>
        {specializations.map((specialty) => (
          <TouchableOpacity
            key={specialty.title}
            style={[
              styles.serviceCard,
              colorScheme === "dark" ? styles.glassmorphism : null,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? theme.cardBackground
                    : iconStyles[specialty.title].background,
                width: itemSize,
                height: itemSize,
              },
            ]}
            onPress={() => router.push("/speciality")}
          >
            <specialty.icon
              color={
                colorScheme === "dark"
                  ? theme.text
                  : iconStyles[specialty.title].color
              }
              size={30}
            />
            <Text style={[styles.serviceText, { color: theme.text }]}>
              {specialty.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Resources() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.resourcesSection,
        colorScheme === "dark" ? styles.glassmorphism : null,
        {
          backgroundColor:
            colorScheme === "dark" ? theme.cardBackground : theme.secondary,
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Quick Resources
      </Text>
      {[
        "📝 Self-Assessment Tools",
        "📚 Study Skills Workshop",
        "🧘‍♀️ Wellness Resources",
      ].map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.resourceButton,
            colorScheme === "dark" ? styles.glassmorphism : null,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : theme.background,
            },
          ]}
        >
          <Text style={[styles.resourceButtonText, { color: theme.text }]}>
            {resource}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function CounselingScreen() {
  const colorScheme = useColorScheme();
  const theme: Theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <ScrollView>
          <Header />
          <QuickAccess />
          <Appointments />
          <SupportServices />
          <Resources />
        </ScrollView>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  profileLocation: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily: "SharpSansNo1",
  },
  quickAccessSection: {
    padding: 20,
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  emergencyButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  appointmentCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counselorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  appointmentInfo: {
    marginLeft: 15,
    flex: 1,
  },
  counselorName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  counselorSpecialty: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: "SharpSansNo1",
  },
  appointmentTime: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: "SharpSansNo1",
  },
  rescheduleButton: {
    padding: 8,
    borderRadius: 8,
  },
  rescheduleText: {
    fontSize: 12,
    fontFamily: "SharpSansBold",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
  serviceCard: {
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceText: {
    fontSize: 12,
    fontFamily: "SharpSansNo1",
    textAlign: "center",
    marginTop: 8,
  },
  resourcesSection: {
    borderRadius: 12,
    margin: 20,
    padding: 20,
  },
  resourceButton: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  resourceButtonText: {
    fontSize: 16,
    fontFamily: "SharpSansNo1",
  },
  glassmorphism: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});
