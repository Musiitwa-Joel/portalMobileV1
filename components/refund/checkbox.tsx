import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  primaryColor: string;
  textColor: string;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  primaryColor,
  textColor,
}: CheckboxProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: primaryColor,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: checked ? primaryColor : "transparent",
    },
    checkmark: {
      width: 10,
      height: 5,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: "#fff",
      transform: [{ rotate: "-45deg" }],
      marginTop: -2,
    },
    label: {
      marginLeft: 12,
      fontSize: 16,
      color: textColor,
      flex: 1,
      fontFamily: "SharpSansNo1",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
