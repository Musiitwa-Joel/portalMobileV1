import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  timestamp: number; // To calculate relative time
}

interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
}

function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Get relative time if notification is from today
  const relativeTime = moment().isSame(notification.timestamp, "day")
    ? moment(notification.timestamp).fromNow()
    : notification.date;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.notificationCard,
          isDark ? styles.containerDark : styles.containerLight,
        ]}
      >
        <View
          style={[
            styles.avatar,
            isDark ? styles.avatarDark : styles.avatarLight,
          ]}
        >
          <Text style={styles.avatarText}>
            {notification.title[0].toUpperCase()}
          </Text>
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text
              style={[
                styles.notificationTitle,
                isDark ? styles.textDark : styles.textLight,
              ]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            <View style={styles.dateContainer}>
              <Text
                style={[
                  styles.date,
                  isDark ? styles.textSecondaryDark : styles.textSecondaryLight,
                ]}
              >
                {relativeTime}
              </Text>
              {!notification.isRead && <View style={styles.unreadDot} />}
            </View>
          </View>
          <Text
            style={[
              styles.notificationDescription,
              isDark ? styles.textSecondaryDark : styles.textSecondaryLight,
            ]}
            numberOfLines={2}
          >
            {notification.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Vista rewards club....",
    description:
      "Earn Points without making a purchase. Complete your first mission today!",
    date: "Dec 16, 2023",
    timestamp: moment("2023-12-16").valueOf(),
    isRead: false,
  },
  {
    id: "2",
    title: "The Vista rewards cl...",
    description:
      "Keep paying with Vista to boost your points and unlock rewards. It's as simple as that.",
    date: "Dec 12, 2023",
    timestamp: moment("2023-12-12").valueOf(),
    isRead: false,
  },
  {
    id: "3",
    title: "The Vista rewards cl...",
    description:
      "Now you're a member of Vista rewards club, start picking up points with every purchase.",
    date: "Dec 8, 2023",
    timestamp: moment("2023-12-08").valueOf(),
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "New Notification",
        description:
          "This is a new notification that appeared after refreshing.",
        date: moment().format("MMM DD, YYYY"),
        timestamp: Date.now(),
        isRead: false,
      };

      // Add new notification only if it doesn't already exist
      setNotifications((prevNotifications) => {
        const alreadyExists = prevNotifications.some(
          (n) => n.id === newNotification.id
        );
        return alreadyExists
          ? prevNotifications
          : [newNotification, ...prevNotifications];
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  const handleNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.section}>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={() => handleNotificationPress(notification)}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedNotification}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              isDark ? styles.modalContentDark : styles.modalContentLight,
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "#FFFFFF" : "#000000"}
              />
            </TouchableOpacity>
            {selectedNotification && (
              <>
                <Text
                  style={[
                    styles.modalTitle,
                    isDark ? styles.textDark : styles.textLight,
                  ]}
                >
                  {selectedNotification.title}
                </Text>
                <Text
                  style={[
                    styles.modalDate,
                    isDark
                      ? styles.textSecondaryDark
                      : styles.textSecondaryLight,
                  ]}
                >
                  {selectedNotification.date}
                </Text>
                <Text
                  style={[
                    styles.modalDescription,
                    isDark ? styles.textDark : styles.textLight,
                  ]}
                >
                  {selectedNotification.description}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "#F5F5F5",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  customizeCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  customizeCardLight: {
    backgroundColor: "#000000",
  },
  customizeCardDark: {
    backgroundColor: "#FFFFFF",
  },
  customizeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 16,
    color: "#1a7de7",
    textDecorationLine: "underline",
  },
  notificationCard: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarLight: {
    backgroundColor: "#FFE1E6",
  },
  avatarDark: {
    backgroundColor: "#4A2F33",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF2D55",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    marginRight: 4,
  },
  notificationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1a7de7",
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  textSecondaryLight: {
    color: "#666666",
  },
  textSecondaryDark: {
    color: "#A0A0A0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    alignItems: "flex-start",
  },
  modalContentLight: {
    backgroundColor: "#FFFFFF",
  },
  modalContentDark: {
    backgroundColor: "#1A1A1A",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});
