import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  Button,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Collapsible } from "@/components/ui/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import PartialPayment from "@/components/prt/PartialPayment";

interface PaymentFormSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
}

function BankPaymentForm() {
  const router = useRouter();
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount Payable (Combined)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          defaultValue="UGX 2,000,000"
          editable={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payable from</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          editable={false}
          defaultValue="CENTENARY BANK, ABSA BANK, DFCU BANK"
        />
      </View>

      <Pressable
        style={styles.continueButton}
        onPress={() => router.push("/prt_details")}
      >
        <Text style={styles.continueButtonText}>Generate PRT</Text>
      </Pressable>
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
          style={styles.input}
          placeholder="Enter your mobile money number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount Payable (Combined)</Text>
        <TextInput
          style={styles.input}
          defaultValue="UGX 2,000,000"
          editable={false}
        />
      </View>

      <Pressable style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Generate PRT</Text>
      </Pressable>
    </View>
  );
}

function PaymentFormSheet({ bottomSheetRef, onClose }: PaymentFormSheetProps) {
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header1}>
          <ThemedText style={styles.title}>
            PRT for all Pending Invoices
          </ThemedText>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
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
  );
}

export default function TabTwoScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleGeneratePRT = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };
  const [expandedIndex, setExpandedIndex] = useState(0);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <View style={styles.headerImageContainer}>
            <IconSymbol
              size={310}
              color="#808080"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.headerImage}
            />
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.header}>
            Generate Payment Token 🗝️
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.info}>
          A PRT is a unique code used to track and verify transactions.
        </ThemedText>
        <Collapsible
          index={0}
          expandedIndex={expandedIndex}
          onToggle={(index) =>
            setExpandedIndex(index === expandedIndex ? -1 : index)
          }
          title="Generate PRT for all pending invoice"
        >
          <ThemedView style={styles.cardContainer}>
            <ThemedView style={styles.timeline} />
            <ThemedView style={styles.permitCard}>
              <ThemedView style={styles.timelineCircle}>
                <ThemedView style={styles.timelineInnerCircle} />
              </ThemedView>
              <ThemedText style={styles.permitNumber}>
                Tuition Fees #INV873484873
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                INV. Amount UGX 550,000.00
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                Amount Paid &nbsp;
                <ThemedText style={styles.timestamp1}>
                  UGX 450,000.00
                </ThemedText>
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                Due: &nbsp;
                <ThemedText style={styles.timestamp2}>
                  UGX 100,000.00
                </ThemedText>
              </ThemedText>
              <ThemedView style={styles.statusContainer}>
                <Icon name="check-circle" size={15} color="#4CAF50" />
              </ThemedView>
              <ThemedView style={styles.statusContainer1}>
                <AnimatedCircularProgress
                  size={40}
                  width={4}
                  fill={100}
                  tintColor="#2a12af"
                  backgroundColor="#e0e0e0"
                >
                  {(fill) => (
                    <ThemedText style={{ fontSize: 9, fontWeight: "bold" }}>
                      {`${Math.round(fill)}%`}
                    </ThemedText>
                  )}
                </AnimatedCircularProgress>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.permitCard}>
              <ThemedView style={styles.timelineCircle}>
                <ThemedView style={styles.timelineInnerCircle} />
              </ThemedView>
              <ThemedText style={styles.permitNumber}>
                Functional #INVF4675638537
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                INV. Amount UGX 550,000.00
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                Amount Paid &nbsp;
                <ThemedText style={styles.timestamp1}>
                  UGX 450,000.00
                </ThemedText>
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                Due: &nbsp;
                <ThemedText style={styles.timestamp2}>
                  UGX 100,000.00
                </ThemedText>
              </ThemedText>
              <ThemedView style={styles.statusContainer}>
                <Icon name="check-circle" size={15} color="#4CAF50" />
              </ThemedView>
              <ThemedView style={styles.statusContainer1}>
                <AnimatedCircularProgress
                  size={40}
                  width={4}
                  fill={75}
                  tintColor="#4CAF50"
                  backgroundColor="#e0e0e0"
                >
                  {(fill) => (
                    <ThemedText style={{ fontSize: 9, fontWeight: "bold" }}>
                      {`${Math.round(fill)}%`}
                    </ThemedText>
                  )}
                </AnimatedCircularProgress>
              </ThemedView>
            </ThemedView>

            <View style={styles.generateButtonContainer}>
              <Button
                title="Generate PRT"
                onPress={handleGeneratePRT}
                color="#2a12af"
              />
            </View>
          </ThemedView>
        </Collapsible>
        <Collapsible
          index={1}
          expandedIndex={expandedIndex}
          onToggle={(index) =>
            setExpandedIndex(index === expandedIndex ? -1 : index)
          }
          title="PRT to make partial payments."
        >
          <ThemedView>
            <PartialPayment />
          </ThemedView>
        </Collapsible>
        <Collapsible
          index={2}
          expandedIndex={expandedIndex}
          onToggle={(index) =>
            setExpandedIndex(index === expandedIndex ? -1 : index)
          }
          title="Generate PRT to deposit to my account"
        >
          <ThemedText>
            For static images, you can use the{" "}
            <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
            provide files for different screen densities
          </ThemedText>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{ alignSelf: "center" }}
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        {/* <Collapsible
          index={3}
          expandedIndex={expandedIndex}
          onToggle={(index) =>
            setExpandedIndex(index === expandedIndex ? -1 : index)
          }
          title="Custom fonts"
        >
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
            to see how to load{" "}
            <ThemedText style={{ fontFamily: "SpaceMono" }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible> */}
        <PaymentFormSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleCloseSheet}
        />
      </ParallaxScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  headerImage: {
    color: "#808080",
    position: "absolute",
    bottom: -90,
    left: -35,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  header: {
    fontSize: 20,
    fontFamily: "SharpSansBold",
    color: "#2a12af",
  },
  info: {
    fontSize: 14,
    fontFamily: "SharpSansNo1",
  },
  cardContainer: {
    paddingLeft: 0,
    position: "relative",
    marginBottom: 30,
  },
  permitCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  permitNumber: {
    fontSize: 15,
    fontFamily: "SharpSansBold",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: "#666",
    fontFamily: "SharpSansNo1",
  },
  timestamp1: {
    fontSize: 14,
    color: "green",
    fontFamily: "SharpSansNo1",
  },
  timestamp2: {
    fontSize: 14,
    color: "red",
    fontFamily: "SharpSansNo1",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 16,
    top: 16,
    gap: 4,
  },
  statusContainer1: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 50,
    gap: 4,
  },
  timeline: {
    position: "absolute",
    left: -10,
    top: 0,
    bottom: 16,
    width: 0.6,
    backgroundColor: "blue",
  },
  timelineCircle: {
    position: "absolute",
    left: -20,
    top: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: "blue",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  timelineInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#808080",
  },
  generateButtonContainer: {
    position: "absolute",
    paddingBottom: 0,
    right: 0,
    bottom: -40,
  },
  // Bottom Sheet Styles
  contentContainer: {
    flex: 1,
    padding: 16,
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
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
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    color: "#666",
    fontSize: 16,
    fontFamily: "SharpSansNo1",
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontFamily: "SharpSansNo1",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "SharpSansNo1",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
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
});
