import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  useColorScheme,
  FlatList,
  ImageSourcePropType,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Stack, useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/mutations";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { AuthContext } from "../context/AuthContext";

interface InstitutionLogo {
  id: number;
  color: string;
  logo: ImageSourcePropType;
  name: string;
}

interface InstitutionItemProps {
  logo: ImageSourcePropType;
  color: string;
  name: string;
  onPress: () => void;
}

const InstitutionItem: React.FC<InstitutionItemProps> = ({
  logo,
  color,
  name,
  onPress,
}) => {
  const styles = getStyles(useColorScheme() === "dark");
  return (
    <TouchableOpacity onPress={onPress} style={styles.institutionItemContainer}>
      <View style={[styles.institutionItem, { backgroundColor: color }]}>
        <Image
          source={logo}
          style={styles.institutionLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.institutionName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function Login() {
  const authContext = useContext(AuthContext);

  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%"], []);
  const [login, { error: loginErr, loading, data }] = useMutation(LOGIN);
  const fadeAnimation = useSharedValue(0);

  const animatedScale = useSharedValue(0.5);

  useEffect(() => {
    animatedScale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScale.value }],
    };
  });

  useEffect(() => {
    if (loginErr) {
      setError(loginErr.message);
    } else {
      setError("");
    }
  }, [loginErr]);

  const styles = getStyles(isDarkMode);

  const handleUserIdChange = useCallback((text: string) => {
    setUserId(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleLogin = async () => {
    // console.log("Login button pressed");

    console.log({
      user_id,
      password,
    });

    const res = await login({
      variables: {
        userId: user_id,
        password,
      },
    });

    if (authContext) {
      authContext.setToken(res.data.studentPortalLogin.token);
    }

    router.replace("/dashboard");
  };

  const handleSwitchPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleInstitutionPress = useCallback((institutionId: number) => {
    console.log(`Institution ${institutionId} selected`);
    // Add logic to switch institution here
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
            >
              <View style={styles.content}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("../../assets/images/institution_logos/nkumbauni.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.subText}>
                  Log in to your student portal 🎉
                </Text>

                {error && (
                  <Animated.Text style={[styles.errorText]}>
                    {error}
                  </Animated.Text>
                )}

                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <AntDesign
                      name="user"
                      size={24}
                      color={isDarkMode ? "#CCCCCC" : "#666666"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="User ID"
                      placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
                      // keyboardType="text"
                      autoCapitalize="none"
                      value={user_id}
                      onChangeText={handleUserIdChange}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={24}
                      color={isDarkMode ? "#CCCCCC" : "#666666"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={isDarkMode ? "#999999" : "#999999"}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={handlePasswordChange}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color={isDarkMode ? "#CCCCCC" : "#666666"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Link href={"/forgot_password"}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    (loading || !password || !user_id) && styles.disabledButton,
                  ]}
                  onPress={handleLogin}
                  disabled={!password || !user_id}
                >
                  {loading ? (
                    <ActivityIndicator
                      animating={true}
                      size="small"
                      color="#fff"
                    />
                  ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or follow us on</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-youtube" size={24} color="#DB4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons
                      name="logo-instagram"
                      size={24}
                      color={isDarkMode ? "#FFFFFF" : "#000000"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Not your institution? </Text>
                <TouchableOpacity onPress={handleSwitchPress}>
                  <Text style={styles.signupLink}>Switch</Text>
                </TouchableOpacity>
              </View> */}
              </View>
            </KeyboardAvoidingView>

            {/* <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.bottomSheetContent}>
              <FlatList
                data={INSTITUTION_LOGOS}
                renderItem={({ item }) => (
                  <InstitutionItem
                    logo={item.logo}
                    color={item.color}
                    name={item.name}
                    onPress={() => handleInstitutionPress(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.institutionList}
              />
            </BottomSheetView>
          </BottomSheetModal> */}
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const getStyles = (isDarkMode: boolean) => {
  const { width } = Dimensions.get("window");
  const itemSize = width * 0.2; // 20% of screen width

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF",
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    content: {
      padding: 20,
      justifyContent: "center",
      minHeight: "100%",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    logo: {
      width: 120,
      height: 120,
    },
    welcomeText: {
      fontSize: 28,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "SharpSansBold",
    },
    subText: {
      fontSize: 16,
      color: isDarkMode ? "#CCCCCC" : "#666666",
      textAlign: "center",
      marginBottom: 20,
      fontFamily: "SharpSansNo1",
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDarkMode ? "#333333" : "#E0E0E0",
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: isDarkMode ? "#FFFFFF" : "#333333",
      fontFamily: "SharpSansNo1",
    },
    eyeIcon: {
      padding: 10,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: "#007AFF",
      fontSize: 14,
      fontFamily: "SharpSansNo1",
    },
    loginButton: {
      backgroundColor: false ? "gray" : "#007AFF",
      borderRadius: 8,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    errorText: {
      color: "#FF3B30",
      fontSize: 14,
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "SharpSansNo1",
    },
    loginButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontFamily: "SharpSansBold",
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDarkMode ? "#333333" : "#E0E0E0",
    },
    dividerText: {
      marginHorizontal: 10,
      color: isDarkMode ? "#CCCCCC" : "#666666",
      fontSize: 14,
      fontFamily: "SharpSansNo1",
    },
    socialButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    socialButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: isDarkMode ? "#333333" : "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    signupText: {
      color: isDarkMode ? "#CCCCCC" : "#666666",
      fontSize: 16,
      fontFamily: "SharpSansBold",
    },
    signupLink: {
      color: "#007AFF",
      fontSize: 16,
      fontFamily: "SharpSansBold",
    },
    bottomSheetContent: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
    },
    institutionList: {
      paddingVertical: 8,
    },
    institutionItemContainer: {
      alignItems: "center",
      marginRight: 12,
    },
    institutionItem: {
      width: itemSize,
      height: itemSize,
      borderRadius: 8,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    institutionLogo: {
      width: "60%",
      height: "60%",
    },
    institutionName: {
      color: isDarkMode ? "#FFFFFF" : "#333333",
      fontSize: 12,
      textAlign: "center",
      width: itemSize,
      fontFamily: "SharpSansNo1",
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
};
