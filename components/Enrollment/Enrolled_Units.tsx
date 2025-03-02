import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from "react-native-safe-area-context";
import { Link } from "expo-router";

interface Module {
  id: string;
  name: string;
  status: string;
}

interface ModuleCardProps {
  module: Module;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onDelete,
  isDarkMode,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Module",
      `Are you sure you want to remove ${module.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(module.id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Animated.View
      style={[animatedStyle]}
      exiting={FadeOut}
      layout={Layout.springify()}
    >
      <View
        style={[
          styles.moduleCard,
          isDarkMode ? styles.moduleCardDark : styles.moduleCardLight,
        ]}
      >
        <View style={styles.moduleContent}>
          <Text
            style={[
              styles.moduleName,
              isDarkMode ? styles.textDark : styles.textLight,
            ]}
          >
            {module.name}
          </Text>
          <Text
            style={[
              styles.moduleStatus,
              isDarkMode ? styles.descriptionDark : styles.descriptionLight,
            ]}
          >
            {module.status}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={isDarkMode ? "#FF453A" : "#FF3B30"}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FloatingButton: React.FC<{
  onPress: () => void;
  isDarkMode: boolean;
  insets: EdgeInsets;
}> = ({ onPress, isDarkMode, insets }) => {
  const buttonScale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <Animated.View
      style={[
        styles.floatingButton,
        animatedStyles,
        { bottom: 20 + insets.bottom },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.floatingButtonTouchable,
          isDarkMode ? styles.floatingButtonDark : styles.floatingButtonLight,
        ]}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={isDarkMode ? "#FFFFFF" : "#000000"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const EmptyState: React.FC<{
  isDarkMode: boolean;
  onAddModule: () => void;
}> = ({ isDarkMode, onAddModule }) => (
  <View style={styles.emptyStateContainer}>
    <Ionicons
      name="book-outline"
      size={64}
      color={isDarkMode ? "#CCCCCC" : "#666666"}
    />
    <Text
      style={[
        styles.emptyStateText,
        isDarkMode ? styles.textDark : styles.textLight,
      ]}
    >
      No modules enrolled yet
    </Text>
  </View>
);

export default function EnrolledModulesScreen() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      name: "COMPUTER MATHEMATICS",
      status: "Retake Paper",
    },
    {
      id: "2",
      name: "DATA STRUCTURES AND ALGORITHMS",
      status: "Supplementary Paper",
    },
    {
      id: "3",
      name: "DATABASE SYSTEMS",
      status: "Regular Paper",
    },
    {
      id: "4",
      name: "COMPUTER NETWORKS",
      status: "Regular Paper",
    },
  ]);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
    slideAnim.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
  }, [fadeAnim, slideAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ translateY: slideAnim.value }],
    };
  });

  const handleDeleteModule = (id: string) => {
    setModules((prevModules) => {
      const updatedModules = prevModules.filter((module) => module.id !== id);
      if (updatedModules.length === 0) {
        handleAddModule();
      }
      return updatedModules;
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      // Sort modules alphabetically by name
      setModules((prevModules) =>
        [...prevModules].sort((a, b) => a.name.localeCompare(b.name))
      );
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleHistoryPress = () => {
    router.push("/history-modal");
  };

  const handleAddModule = useCallback(() => {
    router.push("/enrollment");
  }, [router]);

  useEffect(() => {
    if (modules.length === 0) {
      handleAddModule();
    }
  }, [modules, handleAddModule]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View style={animatedStyle}>
          {modules.length > 0 ? (
            modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onDelete={handleDeleteModule}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <EmptyState isDarkMode={isDarkMode} onAddModule={handleAddModule} />
          )}
        </Animated.View>
      </ScrollView>
      <FloatingButton
        onPress={handleHistoryPress}
        isDarkMode={isDarkMode}
        insets={insets}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  containerLight: {
    backgroundColor: "#FFFFFF",
  },
  containerDark: {
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  moduleCardLight: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
  },
  moduleCardDark: {
    backgroundColor: "#2A2A2A",
    borderColor: "#333333",
  },
  moduleContent: {
    flex: 1,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  moduleStatus: {
    fontSize: 14,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 16,
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  descriptionLight: {
    color: "#666666",
  },
  descriptionDark: {
    color: "#CCCCCC",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
  },
  floatingButtonTouchable: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonLight: {
    backgroundColor: "#FFFFFF",
  },
  floatingButtonDark: {
    backgroundColor: "#2A2A2A",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  addModuleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addModuleButtonLight: {
    backgroundColor: "#1a7de7",
  },
  addModuleButtonDark: {
    backgroundColor: "#3a8cf7",
  },
  addModuleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
