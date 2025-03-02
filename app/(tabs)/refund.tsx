import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import Checkbox from "@/components/refund/checkbox";
import { useRouter } from "expo-router";
interface CancellationReason {
  id: string;
  label: string;
  selected: boolean;
}

export default function ProductCancellation() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    primary: "#1a7de7",
    background: isDark ? "#1a1a1a" : "#ffffff",
    cardBackground: isDark ? "#2a2a2a" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    secondaryText: isDark ? "#cccccc" : "#666666",
    border: isDark ? "#404040" : "#e5e5e5",
    inputBackground: isDark ? "#333333" : "#f5f5f5",
    danger: "#ff3b30",
  };

  const [reasons, setReasons] = useState<CancellationReason[]>([
    { id: "1", label: "Overpayment of tuition fees", selected: false },
    {
      id: "2",
      label: "Course cancellation or change",
      selected: false,
    },
    { id: "3", label: "Withdrawal from the program", selected: false },
    { id: "4", label: "Incorrect fee charge", selected: true },
    { id: "5", label: "Financial hardship", selected: false },
    {
      id: "6",
      label: "Change in residency status",
      selected: false,
    },
    { id: "7", label: "Delayed financial aid", selected: false },
    { id: "8", label: "Incorrect course enrollment", selected: false },
    { id: "9", label: "Others", selected: false },
  ]);

  const [comment, setComment] = useState("");

  const toggleReason = (id: string) => {
    setReasons(
      reasons.map((reason) =>
        reason.id === id ? { ...reason, selected: !reason.selected } : reason
      )
    );
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log(
      "Selected reasons:",
      reasons.filter((r) => r.selected)
    );
    console.log("Comment:", comment);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    sectionTitle: {
      fontSize: 20,
      //   fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    productCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    productInfo: {
      flex: 1,
    },
    productTitle: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
      flexShrink: 1,
      fontFamily: "SharpSansNo1",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    price: {
      fontSize: 20,
      //   fontWeight: "600",
      color: theme.text,
      fontFamily: "SharpSansBold",
    },

    productImage: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      marginLeft: 16,
      marginTop: -30,
    },
    reasonItem: {
      marginBottom: 16,
    },
    commentInput: {
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      padding: 12,
      height: 100,
      color: theme.text,
      textAlignVertical: "top",
      marginTop: 8,
      fontFamily: "SharpSansNo1",
    },
    submitButton: {
      backgroundColor: theme.danger,
      borderRadius: 28,
      padding: 16,
      alignItems: "center",
      marginHorizontal: 16,
      marginBottom: Platform.OS === "ios" ? 32 : 16,
    },
    submitText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "SharpSansBold",
    },
  });
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fees Details</Text>
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>
                Below is your account balance
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>UGX 300,000</Text>
                {/* <Text style={styles.discount}>15% OFF</Text> */}
              </View>
              {/* <Text style={styles.quantity}>Qty - 1</Text> */}
            </View>
            <Image
              source={{
                uri: "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
              }}
              style={styles.productImage}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for Cancellation</Text>
          {reasons.map((reason) => (
            <View key={reason.id} style={styles.reasonItem}>
              <Checkbox
                label={reason.label}
                checked={reason.selected}
                onPress={() => toggleReason(reason.id)}
                primaryColor={theme.primary}
                textColor={theme.text}
              />
              {reason.id === "9" && reason.selected && (
                <TextInput
                  style={styles.commentInput}
                  placeholder="Comment"
                  placeholderTextColor={theme.secondaryText}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push("/agree_terms")}
        style={styles.submitButton}
        // onPress={handleSubmit}
      >
        <Text
          onPress={() => router.push("/agree_terms")}
          style={styles.submitText}
        >
          Send Request
        </Text>
      </TouchableOpacity>
    </View>
  );
}
