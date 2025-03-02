import { CameraView, type CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Alert,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const QR_FRAME_SIZE = width * 0.7;

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"off" | "on" | "auto">("off");
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const [scanned, setScanned] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [scanLineAnim]);

  const toggleFlash = () => {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    Alert.alert("Scanned Data", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? "#000" : "#fff",
  };

  const qrButtonStyle = {
    ...styles.qrButton,
    backgroundColor: isDarkMode ? "#bb86fc" : "#6200ee",
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>We need camera permissions</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <LinearGradient
        colors={isDarkMode ? ["#1a1a2e", "#16213e"] : ["#f8d7e8", "#e6e6fa"]}
        style={styles.gradient}
      >
        {/* Camera View with QR Frame */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            flash={flash}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.qrFrame}>
                {/* QR Frame Corners */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />

                {/* Scanning Line */}
                <Animated.View
                  style={[
                    styles.scanLineContainer,
                    {
                      transform: [
                        {
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, QR_FRAME_SIZE - 4], // Moves up & down
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  {/* Shadow Effect Above the Line */}
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)"]} // Strong dark fade
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.shadowOverlay}
                  />

                  {/* The Green Scan Line */}
                  <LinearGradient
                    colors={[
                      "rgba(0, 255, 0, 0)",
                      "rgba(0, 255, 0, 0.8)",
                      "rgba(0, 255, 0, 0)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.scanLine}
                  />
                </Animated.View>
              </View>

              {/* Torch Button */}
              <TouchableOpacity
                style={styles.torchButton}
                onPress={toggleFlash}
              >
                <Ionicons
                  name={flash === "off" ? "flash-off" : "flash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={qrButtonStyle}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="qr-code-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="scan-outline"
              size={24}
              color={isDarkMode ? "#fff" : "#666"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={isDarkMode ? "#fff" : "#666"}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  gradient: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: QR_FRAME_SIZE,
    height: QR_FRAME_SIZE,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  qrFrame: {
    width: QR_FRAME_SIZE,
    height: QR_FRAME_SIZE,
    borderColor: "#fff",
    borderWidth: 2,
  },
  corner: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "#fff",
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  scanLineContainer: {
    position: "absolute",
    width: "100%",
    height: QR_FRAME_SIZE - 4, // Keep inside frame
    alignItems: "center",
  },

  shadowOverlay: {
    position: "absolute",
    top: -8, // Moves shadow above the line
    width: "100%",
    height: 25, // Adjusted to match image
    backgroundColor: "transparent",
  },

  scanLine: {
    width: "100%",
    height: 20, // Thicker to match your image
    opacity: 0.9, // Stronger effect
  },
  torchButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
});
