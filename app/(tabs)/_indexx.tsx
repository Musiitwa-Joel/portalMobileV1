import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  useColorScheme,
  Dimensions,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");

const profiles = [
  {
    id: 1,
    name: "Nkumba University",
    color: "#0089FF",
    logo: require("../../assets/images/institution_logos/nkumbauni.png"),
  },
  {
    id: 2,
    name: "Busitema University",
    color: "#FFB800",
    logo: require("../../assets/images/institution_logos/busitema.png"),
  },
  {
    id: 3,
    name: "Gulu University",
    color: "#E50914",
    logo: require("../../assets/images/institution_logos/gulu.png"),
  },
  {
    id: 4,
    name: "Kisubi University",
    color: "#00454F",
    logo: require("../../assets/images/institution_logos/kisubi.png"),
  },
];

type RootStackParamList = {
  login: { institutionId: number };
};

type ProfileSelectionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "login"
>;

export default function ProfileSelection() {
  const navigation = useNavigation<ProfileSelectionNavigationProp>();
  const colorScheme = useColorScheme();
  const currentColorScheme = colorScheme || "light";
  const styles = createStyles(currentColorScheme);

  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);
  const profileAnimations = profiles.map(() => useSharedValue(0));

  useEffect(() => {
    fadeIn.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });
    slideUp.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });
    profileAnimations.forEach((anim, index) => {
      anim.value = withDelay(
        300 + index * 100,
        withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) })
      );
    });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const handleProfilePress = (index: number) => {
    profileAnimations[index].value = withSequence(
      withTiming(0.95, { duration: 100, easing: Easing.inOut(Easing.quad) }),
      withTiming(1, { duration: 100, easing: Easing.inOut(Easing.quad) })
    );

    navigation.navigate("login", { institutionId: profiles[index].id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, containerStyle]}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/tredumo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Choose your institution</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profilesContainer}>
            {profiles.map((profile, index) => (
              <ProfileButton
                key={profile.id}
                profile={profile}
                animation={profileAnimations[index]}
                onPress={() => handleProfilePress(index)}
                colorScheme={currentColorScheme}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

interface ProfileButtonProps {
  profile: (typeof profiles)[0];
  animation: Animated.SharedValue<number>;
  onPress: () => void;
  colorScheme: "light" | "dark";
}

function ProfileButton({
  profile,
  animation,
  onPress,
  colorScheme,
}: ProfileButtonProps) {
  const styles = createStyles(colorScheme);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    transform: [
      { scale: animation.value },
      { translateY: (1 - animation.value) * 20 },
    ],
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={[styles.profileButton, animatedStyle]}>
        <View style={[styles.avatar, { backgroundColor: profile.color }]}>
          <Image
            source={profile.logo}
            style={styles.universityLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.profileName}>{profile.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const createStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#F5F5F5",
    },
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 30,
    },
    logo: {
      width: width * 0.6,
      height: 35,
      marginTop: 35,
    },
    title: {
      fontFamily: "SharpSansNo1",
      color: colorScheme === "dark" ? "#FFFFFF" : "#333333",
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
    },
    profilesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    profileButton: {
      alignItems: "center",
      width: width * 0.32,
      marginBottom: 10,
    },
    avatar: {
      width: width * 0.22,
      height: width * 0.22,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    universityLogo: {
      width: "70%",
      height: "70%",
    },
    profileName: {
      fontFamily: "SharpSansNo1",
      color: colorScheme === "dark" ? "#E0E0E0" : "#4A4A4A",
      fontSize: 12,
      textAlign: "center",
      fontWeight: "600",
    },
  });
};
