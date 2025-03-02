import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CounsellorData {
  id: string;
  name: string;
  image: string;
  timeSlot: string;
  isOnline: boolean;
}

export default function CounsellorProfileScreen() {
  const router = useRouter();
  const { counsellor: counsellorString } = useLocalSearchParams();
  const counsellor: CounsellorData = JSON.parse(counsellorString as string);
  const colorScheme = useColorScheme();
  const handleBookCounsellor = () => {
    router.push({
      pathname: "/chat",
      params: { id: counsellor.id, counsellor: JSON.stringify(counsellor) },
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
    },
    profileSection: {
      alignItems: "center",
      padding: 20,
    },
    imageContainer: {
      position: "relative",
      marginBottom: 16,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    onlineIndicator: {
      position: "absolute",
      bottom: 5,
      right: 5,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: "#4CAF50",
      borderWidth: 2,
      borderColor: "#fff",
    },
    name: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 4,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    status: {
      fontSize: 16,
      color: "#666",
      marginBottom: 8,
    },
    info: {
      fontSize: 14,
      color: "#666",
      marginBottom: 4,
    },
    specialitiesSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    specialitiesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -8,
    },
    specialityTag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? "#333" : "#F5F5F5",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      margin: 8,
    },
    specialityText: {
      marginLeft: 4,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    bookButton: {
      backgroundColor: "#FFC107",
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
    },
    bookButtonText: {
      color: "#000",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: counsellor.image }}
              style={styles.profileImage}
            />
            {counsellor.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <Text style={styles.name}>{counsellor.name}</Text>
          <Text style={styles.info}>Counsellor since June 2015</Text>
          <Text style={styles.info}>{counsellor.timeSlot}</Text>
        </View>

        <View style={styles.specialitiesSection}>
          <Text style={styles.sectionTitle}>Specialities</Text>
          <View style={styles.specialitiesGrid}>
            {[
              "Health",
              "Career",
              "Interpersonal",
              "Financial",
              "Accomodation",
              "Trauma",
              "Substance Abuse",
              "Bullying",
              "Anxiety",
            ].map((specialty) => (
              <View key={specialty} style={styles.specialityTag}>
                <Feather name="star" size={16} color="#1a7de7" />
                <Text style={styles.specialityText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookCounsellor}
        >
          <Text style={styles.bookButtonText}>TALK TO COUNSELLOR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
