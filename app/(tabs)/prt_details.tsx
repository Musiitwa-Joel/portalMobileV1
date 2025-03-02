import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface SplitRequestProps {
  onClose: () => void;
  onTransfer: () => void;
  onViewBill: () => void;
}

interface BillItem {
  name: string;
  price: number;
}

export default function SplitRequestScreen({
  onClose,
  onTransfer,
  onViewBill,
}: SplitRequestProps) {
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

  const billItems: BillItem[] = [
    { name: "Tuition Fees", price: 15000 },
    { name: "Functional Fees", price: 450000 },
    { name: "Retake Fees", price: 20000 },
  ];

  const total = billItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Token generation successful 🎉{"\n"}
            You can now proceed with the payment.{" "}
          </Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>
              Musiitwa Joel &nbsp; 2000100121
            </Text>
            <Text style={styles.prtText}>PRT: TN45352674958778</Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>Total amount to be transacted</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalAmount}>
              <Text>UGX</Text> {total.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.breakdownTitle}>Amount breakdown</Text>
        </View>

        <View style={styles.itemsContainer}>
          {billItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                UGX&nbsp;{item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.transferButton} onPress={onTransfer}>
        <Text style={styles.transferButtonText}>Proceed to Mobile Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: -40,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "#D6E0D8",
    marginHorizontal: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
    color: "#37375C",
    lineHeight: 24,
    fontFamily: "SharpSansNo1",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    color: "#37375C",
    // fontWeight: "bold",
    fontFamily: "SharpSansBold",
  },
  prtText: {
    fontSize: 14,
    color: "#8888A5",
    fontFamily: "SharpSansNo1",
  },
  amountSection: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#8888A5",
    marginBottom: 8,
    fontFamily: "SharpSansNo1",
  },
  breakdownTitle: {
    fontSize: 16,
    color: "#37375C",
    marginTop: 30,
    fontFamily: "SharpSansNo1",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "#37375C",
    fontFamily: "SharpSansBold",
  },
  itemsContainer: {
    padding: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    fontSize: 16,
    color: "#37375C",
    fontFamily: "SharpSansNo1",
  },
  itemPrice: {
    fontSize: 16,
    color: "#37375C",
    fontWeight: "500",
    fontFamily: "SharpSansBold",
  },
  transferButton: {
    backgroundColor: "#37375C",
    margin: 16,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  transferButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SharpSansBold",
    // fontWeight: "600",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    marginTop: -40,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "#2a2a2a",
    marginHorizontal: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 24,
    fontFamily: "SharpSansNo1",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    color: "#e0e0e0",
    // fontWeight: "bold",
    fontFamily: "SharpSansBold",
  },
  prtText: {
    fontSize: 14,
    color: "#b0b0b0",
    fontFamily: "SharpSansNo1",
  },
  amountSection: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#b0b0b0",
    marginBottom: 8,
    fontFamily: "SharpSansNo1",
  },
  breakdownTitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginTop: 30,
    fontFamily: "SharpSansNo1",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "#e0e0e0",
    fontFamily: "SharpSansBold",
  },
  itemsContainer: {
    padding: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  itemName: {
    fontSize: 16,
    color: "#e0e0e0",
    fontFamily: "SharpSansNo1",
  },
  itemPrice: {
    fontSize: 16,
    color: "#e0e0e0",
    fontWeight: "500",
    fontFamily: "SharpSansBold",
  },
  transferButton: {
    backgroundColor: "#4a4a7d",
    margin: 16,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  transferButtonText: {
    color: "#fff",
    fontSize: 16,
    // fontWeight: "600",
    fontFamily: "SharpSansBold",
  },
});
