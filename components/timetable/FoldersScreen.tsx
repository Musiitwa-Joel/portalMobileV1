import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

interface FolderCardProps {
  title: string;
  date: string;
  color: string;
  backgroundColor: string;
  onPress?: () => void;
  onMorePress?: () => void;
}

export default function FolderCard({
  title,
  date,
  color,
  backgroundColor,
  onPress,
  onMorePress,
}: FolderCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    card: {
      borderRadius: 16,
      padding: 16,
      margin: 8,
      flex: 1,
      minHeight: 120,
      backgroundColor: isDark ? backgroundColor + "40" : backgroundColor, // Add transparency for dark mode
    },
    content: {
      flex: 1,
    },
    folderIcon: {
      marginBottom: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 4,
      color: isDark ? "#ffffff" : "#000000",
    },
    date: {
      fontSize: 12,
      color: isDark ? "#a0a0a0" : "#666666",
    },
    moreButton: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 4,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <Ionicons
          name="folder"
          size={40}
          color={color}
          style={styles.folderIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
          <Entypo
            name="dots-three-vertical"
            size={16}
            color={isDark ? "#a0a0a0" : "#666666"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
