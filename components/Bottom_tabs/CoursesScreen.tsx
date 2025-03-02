import type React from "react";
import { useRef, useEffect, useCallback } from "react";
import { useRouter, RelativePathString } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  Path,
  Defs,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

const { width } = Dimensions.get("window");

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface CurvedGradientProps {
  translateY: Animated.Value;
  opacity: Animated.Value;
}

const CurvedGradient: React.FC<CurvedGradientProps> = ({
  translateY,
  opacity,
}) => (
  <AnimatedSvg
    height={300}
    width={width}
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      transform: [{ translateY }],
      opacity,
    }}
  >
    <Defs>
      <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.2" />
        <Stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d={`M0 300 Q ${width / 2} 0 ${width} 300 L${width} 300 L0 300 Z`}
      fill="url(#grad)"
    />
  </AnimatedSvg>
);

interface CircleGradientProps {
  translateX: Animated.Value;
  scale: Animated.Value;
}

const CircleGradient: React.FC<CircleGradientProps> = ({
  translateX,
  scale,
}) => (
  <Animated.View
    style={{
      position: "absolute",
      bottom: 50,
      left: -100,
      transform: [{ translateX }, { scale }],
    }}
  >
    <LinearGradient
      colors={["rgba(108, 92, 231, 0.2)", "rgba(108, 92, 231, 0)"]}
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  </Animated.View>
);

const EnhancedAnimatedGradient = () => {
  const translateY1 = useRef(new Animated.Value(300)).current;
  const translateY2 = useRef(new Animated.Value(300)).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const animate = useCallback(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY1, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY1, {
            toValue: 300,
            duration: 10000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY2, {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY2, {
            toValue: 300,
            duration: 15000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity1, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity2, {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 7000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: width,
            duration: 20000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: 20000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, [translateY1, translateY2, opacity1, opacity2, translateX, scale]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <>
      <CurvedGradient translateY={translateY1} opacity={opacity1} />
      <CurvedGradient translateY={translateY2} opacity={opacity2} />
      <CircleGradient translateX={translateX} scale={scale} />
    </>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    name: {
      fontSize: 20,
      fontFamily: "SharpSansBold",
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
    },
    statsContainer: {
      backgroundColor: "#6c5ce7",
      borderRadius: 25,
      marginHorizontal: 16,
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      color: "#ffffff",
      fontSize: 24,
      fontFamily: "SharpSansBold",
      fontWeight: "bold",
    },
    statLabel: {
      color: "#ffffff",
      opacity: 0.7,
      fontSize: 12,
      fontFamily: "SharpSansNo1",
    },
    gridContainer: {
      margin: 16,
      marginTop: 20,
    },
    gridRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    gridItem: {
      alignItems: "center",
      width: "48%",
      backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      marginBottom: 8,
    },
    gridItemText: {
      color: isDark ? "#ffffff" : "#000000",
      fontSize: 14,
      textAlign: "center",
      fontFamily: "SharpSansNo1",
    },
  });

  const gridItems = [
    { title: "Student", icon: "school-outline", color: "#4CAF50" },
    { title: "Staff", icon: "people-outline", color: "#2196F3" },
    { title: "Visitor", icon: "person-outline", color: "#FFC107" },
    { title: "Non Teaching Staff", icon: "business-outline", color: "#9C27B0" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-29%20at%2011.00.55-9mb5DOb29OIbRe5pUohxWbFOKWfZWN.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Musiitwa Joel</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,080</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>76</Text>
            <Text style={styles.statLabel}>Staff today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Visitors today</Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {Array(Math.ceil(gridItems.length / 2))
            .fill(0)
            .map((_, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {gridItems
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.gridItem}
                      onPress={
                        item.title === "Student"
                          ? () =>
                              router.push("/student_scan" as RelativePathString)
                          : undefined
                      }
                    >
                      <View style={styles.iconContainer}>
                        <Ionicons
                          name={item.icon as any}
                          size={50}
                          color={item.color}
                        />
                      </View>
                      <Text style={styles.gridItemText}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
        </View>
      </ScrollView>
      <EnhancedAnimatedGradient />
    </SafeAreaView>
  );
}
