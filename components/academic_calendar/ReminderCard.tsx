import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { ReminderItem } from "@/types/schedule";

export const ReminderCard: React.FC<ReminderItem> = ({ title, timeRange }) => {
  return (
    <View
      style={{
        marginVertical: 8,
        padding: 16,
        backgroundColor: "#7C5CFF",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Feather name="calendar" size={24} color="#FFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: "#FFF", marginBottom: 4 }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather
            name="clock"
            size={16}
            color="#FFF"
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: "#FFF", opacity: 0.8 }}>{timeRange}</Text>
        </View>
      </View>
    </View>
  );
};
