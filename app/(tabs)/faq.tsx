import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "How do I reset my student portal password?",
    answer:
      "To reset your student portal password, go to the login page and click on the 'Forgot Password' link. Enter your email address or username associated with your account and submit. You will receive an email with password reset instructions; check your inbox and spam folder. Follow the instructions in the email to set a new password. Once done, return to the login page and log in with your new password. If you experience any issues or do not receive the reset email, please contact our technical support team for assistance.",
  },
  {
    question: "Where can I view my grades?",
    answer:
      "Your grades are accessible in the 'Academics' section. Click on 'Grade Report' to view your current and past semester grades.",
  },
  {
    question:
      "What should I do if I'm having technical issues with the portal?",
    answer:
      "If you are experiencing technical issues with the portal, start by checking the available help resources. The FAQs and help guides on the portal are designed to address common problems and provide step-by-step solutions.",
  },
];

// const Header = React.memo(({ isDark }: { isDark: boolean }) => {
//   const styles = useStyles(isDark);
//   return (
//     <View style={styles.header}>
//       <TouchableOpacity>
//         <Ionicons
//           name="chevron-back"
//           size={24}
//           color={isDark ? "#fff" : "#000"}
//         />
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>Help Desk</Text>
//       <TouchableOpacity>
//         <Ionicons
//           name="settings-outline"
//           size={24}
//           color={isDark ? "#fff" : "#000"}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// });

const FAQItem = React.memo(
  ({
    item,
    isExpanded,
    onToggle,
    isDark,
  }: {
    item: FAQItem;
    isExpanded: boolean;
    onToggle: () => void;
    isDark: boolean;
  }) => {
    const styles = useStyles(isDark);
    return (
      <TouchableOpacity style={styles.faqItem} onPress={onToggle}>
        <View style={styles.faqQuestion}>
          <Text style={styles.questionText}>{item.question}</Text>
          <Ionicons
            name={isExpanded ? "remove" : "add"}
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </View>
        {isExpanded && <Text style={styles.faqAnswer}>{item.answer}</Text>}
      </TouchableOpacity>
    );
  }
);

const CTASection = React.memo(() => {
  const isDark = useColorScheme() === "dark";
  const styles = useStyles(isDark);
  return (
    <View style={styles.ctaContainer}>
      <Text style={styles.ctaText}>Still stuck? Help us a mail away</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
});

const SearchBar = React.memo(({ isDark }: { isDark: boolean }) => {
  const styles = useStyles(isDark);
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={isDark ? "#aaa" : "#666"} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Help"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
      />
    </View>
  );
});

export default function HelpDesk() {
  const colorScheme = useColorScheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isDark = colorScheme === "dark";

  const styles = useStyles(isDark);

  const toggleFAQ = useCallback((index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const memoizedFAQItems = useMemo(
    () =>
      faqData.map((item, index) => (
        <FAQItem
          key={index}
          item={item}
          isExpanded={expandedIndex === index}
          onToggle={() => toggleFAQ(index)}
          isDark={isDark}
        />
      )),
    [expandedIndex, isDark, toggleFAQ]
  );

  const memoizedContent = useMemo(
    () => (
      <>
        <Text style={styles.mainTitle}>
          We're here to help you with anything and everything on Tredumo
        </Text>

        <SearchBar isDark={isDark} />

        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>FAQ</Text>
          {memoizedFAQItems}
        </View>
      </>
    ),
    [styles, isDark, memoizedFAQItems]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {/* <Header isDark={isDark} /> */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          overScrollMode="always"
        >
          {memoizedContent}
        </ScrollView>
        <CTASection />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#eee",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    content: {
      flex: 1,
      marginTop: -70,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 140,
    },
    mainTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    description: {
      fontSize: 15,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 24,
      lineHeight: 24,
      fontFamily: "SharpSansNo1",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#222" : "#f5f5f5",
      borderRadius: 30,
      padding: 12,
      marginBottom: 32,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansNo1",
    },
    faqSection: {
      marginTop: 5,
    },
    faqTitle: {
      fontSize: 20,
      //   fontWeight: "bold",
      marginBottom: 16,
      color: isDark ? "#fff" : "#000",
      fontFamily: "SharpSansBold",
    },
    faqItem: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#eee",
      paddingVertical: 16,
    },
    faqQuestion: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    questionText: {
      fontSize: 16,
      //   fontWeight: "200",
      color: isDark ? "#fff" : "#000",
      flex: 1,
      fontFamily: "SharpSansBold",
    },
    faqAnswer: {
      marginTop: 12,
      fontSize: 14,
      lineHeight: 22,
      color: isDark ? "#aaa" : "#666",
      fontFamily: "SharpSansNo1",
    },
    ctaContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDark ? "#1a1a1a" : "#fff",
      padding: 20,
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: isDark ? "#333" : "#eee",
      paddingBottom: 34,
    },
    ctaText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDark ? "#fff" : "#000",
    },
    button: {
      backgroundColor: "#ff4757",
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 30,
      width: "100%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    keyboardAvoidingView: {
      flex: 1,
    },
  });
