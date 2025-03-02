import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router"; // Import useRouter

// Types
type ServiceItem = {
  id: string;
  title: string;
  icon: string;
  color: string;
};

type ServiceCardProps = {
  item: ServiceItem;
  isDark: boolean;
  onPress: (id: string) => void;
};

// Data
const services: ServiceItem[] = [
  {
    id: "1",
    title: "Program Change",
    icon: "file-document-edit",
    color: "#4CAF50",
  },
  { id: "2", title: "New ID", icon: "card-account-details", color: "#2196F3" },
  { id: "3", title: "Refund", icon: "cash-refund", color: "#FFC107" },
  { id: "4", title: "New Feature", icon: "star-plus", color: "#9C27B0" },
  { id: "5", title: "Timetables", icon: "timetable", color: "#FF5722" },
  { id: "6", title: "Campus Map", icon: "map", color: "#3F51B5" },
  { id: "7", title: "Campus WIFI", icon: "wifi", color: "#00BCD4" },
  {
    id: "8",
    title: "University Staff",
    icon: "account-group",
    color: "#795548",
  },
  { id: "9", title: "E-Library", icon: "library", color: "#607D8B" },
];

const ServiceCard: React.FC<ServiceCardProps> = ({ item, isDark, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF" },
        { borderColor: isDark ? "purple" : "black" },
      ]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "230" }]}
      >
        <Icon name={item.icon} size={32} color={item.color} />
      </View>
      <Text
        style={[styles.cardTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function Services(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter(); // Use useRouter hook

  const handleServicePress = (id: string) => {
    if (id === "1") {
      router.push("/program_change"); // Navigate to program_change route
    } else if (id === "2") {
      router.push("/new_id");
    } else if (id === "3") {
      router.push("/new_refund");
    } else if (id === "4") {
      router.push("/new_feature");
    } else if (id === "5") {
      router.push("/timetable");
    } else {
      console.log(`Service ${id} pressed`);
      // Handle other navigation or action here
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#ffffff" },
      ]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <View style={styles.grid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            item={service}
            isDark={isDark}
            onPress={handleServicePress}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 8 : 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 35,
    gap: 14,
  },
  card: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "SharpSansNo1",
  },
});
