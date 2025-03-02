import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const theme = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    headerBackground: "#F5F5F5",
    inputBorder: "#DDDDDD",
    totalBackground: "#39CA74",
    buttonBackground: "#111827",
    buttonText: "#FFFFFF",
  },
  dark: {
    background: "#151718",
    text: "#FFFFFF",
    headerBackground: "#2C2C2C",
    inputBorder: "#444444",
    totalBackground: "#2E7D32",
    buttonBackground: "#4A5568",
    buttonText: "#FFFFFF",
  },
};

interface FeeItem {
  description: string;
  amount: number;
  paid: number;
  id: string;
}

export default function FeePaymentComponent() {
  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    { id: "1", description: "Tuition Fees", amount: 1380000, paid: 45 },
    { id: "2", description: "Functional Fees", amount: 599755, paid: 0 },
    { id: "3", description: "RETAKE FEES CAS2102", amount: 20000, paid: 0 },
  ]);

  const [amountsToPay, setAmountsToPay] = useState<{ [key: string]: string }>(
    {}
  );

  const colorScheme = useColorScheme();
  const colors = theme[colorScheme === "dark" ? "dark" : "light"];
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " UGX";
  };

  const calculateTotal = useCallback(() => {
    return Object.values(amountsToPay).reduce((acc, curr) => {
      return acc + (Number(curr) || 0);
    }, 0);
  }, [amountsToPay]);

  const handleAmountChange = (id: string, value: string) => {
    setAmountsToPay((prev) => ({
      ...prev,
      [id]: value.replace(/[^0-9]/g, ""),
    }));
  };

  const renderItem = ({ item }: { item: FeeItem }) => (
    <View style={[styles.row, { borderBottomColor: colors.inputBorder }]}>
      <Text style={[styles.descriptionCell, { color: colors.text }]}>
        {item.description}
      </Text>
      <Text style={[styles.amountCell, { color: colors.text }]}>
        {formatCurrency(item.amount)}
      </Text>
      <Text style={[styles.paidCell, { color: colors.text }]}>
        {formatCurrency(item.paid)}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.inputBorder,
            color: colors.text,
            backgroundColor: colors.background,
          },
        ]}
        keyboardType="numeric"
        value={amountsToPay[item.id] || ""}
        onChangeText={(value) => handleAmountChange(item.id, value)}
        placeholder="0"
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View
        style={[styles.header, { backgroundColor: colors.headerBackground }]}
      >
        <Text style={[styles.headerCell, { color: colors.text }]}>DESC</Text>
        <Text style={[styles.headerCell, { color: colors.text }]}>AMOUNT</Text>
        <Text style={[styles.headerCell, { color: colors.text }]}>PAID</Text>
        <Text style={[styles.headerCell, { color: colors.text }]}>TO PAY</Text>
      </View>

      <FlatList
        data={feeItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View
        style={[
          styles.totalContainer,
          { backgroundColor: colors.totalBackground },
        ]}
      >
        <Text style={styles.totalLabel}>TOTAL AMOUNT TO PAY</Text>
        <Text style={styles.totalAmount}>
          {formatCurrency(calculateTotal())}
        </Text>
      </View>

      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: colors.buttonBackground },
        ]}
        onPress={() => router.push("/prt_details")}
      >
        <Text style={[styles.continueButtonText, { color: colors.buttonText }]}>
          Generate PRT
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  continueButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "SharpSansBold",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontFamily: "SharpSansBold",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  descriptionCell: {
    flex: 1,
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  amountCell: {
    flex: 1,
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  paidCell: {
    flex: 1,
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    fontFamily: "SharpSansNo1",
  },
  totalContainer: {
    flexDirection: "row",
    padding: 15,
    marginTop: 20,
    justifyContent: "space-between",
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "SharpSansBold",
  },
  totalAmount: {
    color: "#FFFFFF",
    fontFamily: "SharpSansBold",
    fontSize: 14,
  },
});
