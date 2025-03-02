import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FolderCard from "@/components/timetable/FoldersScreen";

interface Folder {
  id: string;
  title: string;
  date: string;
  color: string;
  backgroundColor: string;
}

export default function FoldersScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    background: isDark ? "#1a1a1a" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    primary: "#1a7de7",
    secondary: isDark ? "#333333" : "#f0f0f0",
  };

  const folders: Folder[] = [
    {
      id: "1",
      title: "Lecture Timetable",
      date: "December 20,2020",
      color: "#4B6BFB",
      backgroundColor: "#EEF2FF",
    },
    {
      id: "2",
      title: "Exam Timetable",
      date: "December 14,2020",
      color: "#FBB040",
      backgroundColor: "#FFF7E6",
    },
    {
      id: "3",
      title: "Test Timetable",
      date: "November 22,2020",
      color: "#FF6B6B",
      backgroundColor: "#FFE6E6",
    },
    {
      id: "4",
      title: "Download all",
      date: "November 10,2020",
      color: "#2DD4BF",
      backgroundColor: "#E6FFFA",
    },
  ];

  const renderItem = ({ item }: { item: Folder }) => (
    <FolderCard
      title={item.title}
      date={item.date}
      color={item.color}
      backgroundColor={item.backgroundColor}
      onPress={() => console.log("Folder pressed:", item.title)}
      onMorePress={() => console.log("More pressed:", item.title)}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={folders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  listContent: {
    padding: 8,
  },
});
