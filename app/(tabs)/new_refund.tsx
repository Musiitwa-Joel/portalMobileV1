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
    title: "Refund Request",
    icon: "cash-refund",
    color: "#4CAF50",
  },
  {
    id: "2",
    title: "Track Refund",
    icon: "eight-track",
    color: "#2196F3",
  },
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

export default function NewRefund(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const handleServicePress = (id: string) => {
    if (id === "1") {
      router.push("/refund");
    } else if (id === "2") {
      router.push("/refund_list");
    } else {
      console.log(`ID ${id} pressed`);
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
