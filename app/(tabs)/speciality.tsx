import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface CounsellorData {
  id: string;
  name: string;
  image: string;
  timeSlot: string;
  isOnline: boolean;
}

const counsellors: CounsellorData[] = [
  {
    id: "1",
    name: "John Okello",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  {
    id: "2",
    name: "Mary Nakiwala",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100125",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  {
    id: "3",
    name: "Peter Kato",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100128",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  {
    id: "4",
    name: "Grace Namutebi",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100130",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  {
    id: "5",
    name: "David Ochieng",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100311",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  {
    id: "6",
    name: "Sarah Achieng",
    image:
      "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100131",
    timeSlot: "9:00am - 3:00pm",
    isOnline: true,
  },
  // Add other counsellors data if needed
];

export default function CounsellorsListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
    },
    searchContainer: {
      padding: 16,
    },
    searchInput: {
      height: 44,
      borderWidth: 1,
      borderColor: "#E5E5E5",
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: colorScheme === "dark" ? "#333" : "#F5F5F5",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    counsellorGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 8,
    },
    counsellorCard: {
      width: "33.33%",
      padding: 8,
    },
    counsellorImageContainer: {
      position: "relative",
    },
    counsellorImage: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: "50%",
    },
    onlineIndicator: {
      position: "absolute",
      bottom: 5,
      right: 20,

      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#4CAF50",
      borderWidth: 2,
      borderColor: "#fff",
    },
    counsellorName: {
      textAlign: "center",
      marginTop: 8,
      fontSize: 14,
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    counsellorTime: {
      textAlign: "center",
      fontSize: 12,
      color: "#666",
    },
    bottomNav: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#E5E5E5",
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
    },
    navItem: {
      alignItems: "center",
    },
    navText: {
      fontSize: 12,
      marginTop: 4,
      color: "#1a7de7",
    },
  });

  // Filter counsellors based on the search query (case-insensitive)
  const filteredCounsellors = counsellors.filter((counsellor) =>
    counsellor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Counsellor's Name"
          placeholderTextColor={colorScheme === "dark" ? "#999" : "#666"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView>
        <View style={styles.counsellorGrid}>
          {filteredCounsellors.map((counsellor) => (
            <TouchableOpacity
              key={counsellor.id}
              style={styles.counsellorCard}
              onPress={() =>
                router.push({
                  pathname: "/counselor_profile",
                  params: {
                    id: counsellor.id,
                    counsellor: JSON.stringify(counsellor),
                  },
                })
              }
            >
              <View style={styles.counsellorImageContainer}>
                <Image
                  source={{ uri: counsellor.image }}
                  style={styles.counsellorImage}
                />
                {counsellor.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <Text style={styles.counsellorName}>{counsellor.name}</Text>
              <Text style={styles.counsellorTime}>{counsellor.timeSlot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
