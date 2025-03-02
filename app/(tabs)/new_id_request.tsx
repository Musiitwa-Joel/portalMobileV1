import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface FormData {
  reason: string;
}

interface ThemeColors {
  background: string;
  text: string;
  border: string;
  primary: string;
}

const lightTheme: ThemeColors = {
  background: "#FFFFFF",
  text: "#000000",
  border: "#E5E7EB",
  primary: "#007AFF",
};

const darkTheme: ThemeColors = {
  background: "#1C1C1E",
  text: "#FFFFFF",
  border: "#38383A",
  primary: "#0A84FF",
};

export default function NewIDRequest({ navigation }: { navigation: any }) {
  const colorScheme = useColorScheme();
  const theme: ThemeColors = colorScheme === "dark" ? darkTheme : lightTheme;

  const [formData, setFormData] = useState<FormData>({
    reason: "",
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const [activeTab, setActiveTab] = useState<"bank" | "mobile">("bank");

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const handleProceedToPayment = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },
    backButton: {
      color: theme.primary,
      fontSize: 17,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "600",
      color: theme.text,
      marginRight: 40,
    },
    title: {
      fontSize: 20,
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
    subtitle: {
      fontSize: 17,
      color: theme.text,
      marginBottom: 24,
      opacity: 0.7,
      fontFamily: "SharpSansNo1",
    },
    formGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 17,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansNo1",
    },
    required: {
      color: "#FF3B30",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
      backgroundColor: theme.background,
      height: 120,
      textAlignVertical: "top",
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    largeInput: {
      height: 60,
    },
    submitButton: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 32,
      marginBottom: Platform.OS === "ios" ? 32 : 16,
    },
    submitText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "600",
      fontFamily: "SharpSansNo1",
    },
    bottomSheetContent: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    handleIndicator: {
      backgroundColor: "#DCE0E5",
      width: 40,
      height: 4,
      borderRadius: 2,
    },
    header1: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 18,
      color: theme.text,
    },
    tabContainer: {
      flexDirection: "row",
      backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#F3F4F6",
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 8,
    },
    tabActive: {
      backgroundColor: theme.background,
    },
    tabText: {
      color: theme.text,
      fontSize: 16,
      fontFamily: "SharpSansNo1",
    },
    form: {
      gap: 16,
    },
    inputGroup: {
      gap: 8,
    },
    continueButton: {
      backgroundColor: "#111827",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    continueButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "SharpSansBold",
    },
    input1: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      fontFamily: "SharpSansNo1",
      color: theme.text,
      backgroundColor: theme.background,
    },
    bottomSheetTitle: {
      fontSize: 20,
      color: theme.text,
      marginBottom: 8,
      fontFamily: "SharpSansBold",
    },
  });

  const renderFormField = (
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    isLargeInput: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, isLargeInput && styles.largeInput]}
        multiline
        numberOfLines={isLargeInput ? 4 : 2}
        placeholder={`Enter ${label.toLowerCase()}...`}
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );

  function BankPaymentForm() {
    const router = useRouter();
    return (
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount Payable</Text>
          <TextInput
            style={styles.input1}
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
            defaultValue="UGX 15,000"
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payable from</Text>
          <TextInput
            style={styles.input1}
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
            editable={false}
            defaultValue="CENTENARY BANK, ABSA BANK, DFCU BANK"
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/prt_details")}
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
        >
          {/* <Text style={styles.continueButtonText}>Generate PRT</Text> */}
          <Pressable
            // style={styles.continueButton}
            onPress={() => router.push("/prt_details")}
          >
            <Text style={styles.continueButtonText}>Generate PRT</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    );
  }

  function MobileMoneyForm() {
    return (
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Mobile Money Number (+256) Airtel & MTN
          </Text>
          <TextInput
            style={styles.input1}
            placeholder="Enter your mobile money number"
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount Payable</Text>
          <TextInput
            style={styles.input1}
            defaultValue="UGX 15,000"
            editable={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.continueButtonText}>Generate PRT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>New ID Request</Text>
          <Text style={styles.subtitle}>
            Please fill in the details for your new ID request.
          </Text>

          {renderFormField(
            "Reason for applying for a new ID",
            formData.reason,
            (text) => setFormData({ ...formData, reason: text })
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleProceedToPayment}
          >
            <Text style={styles.submitText}>Generate Token</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={{ backgroundColor: theme.background }}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <View style={styles.header1}>
              <Text style={styles.bottomSheetTitle}>Payment for New ID</Text>
              <Pressable onPress={handleCloseSheet} style={styles.closeButton}>
                <Text style={[styles.closeButtonText, { color: theme.text }]}>
                  ✕
                </Text>
              </Pressable>
            </View>

            <View style={styles.tabContainer}>
              <Pressable
                style={[styles.tab, activeTab === "bank" && styles.tabActive]}
                onPress={() => setActiveTab("bank")}
              >
                <Text style={styles.tabText}>Bank Payment</Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === "mobile" && styles.tabActive]}
                onPress={() => setActiveTab("mobile")}
              >
                <Text style={styles.tabText}>Mobile Money</Text>
              </Pressable>
            </View>

            {activeTab === "bank" ? <BankPaymentForm /> : <MobileMoneyForm />}
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
