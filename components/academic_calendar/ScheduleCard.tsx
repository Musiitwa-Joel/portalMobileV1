import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { ScheduleEvent } from "@/types/schedule";

export const ScheduleCard: React.FC<ScheduleEvent> = ({
  time,
  title,
  participants,
}) => {
  return (
    <View
      style={{
        marginVertical: 8,
        padding: 16,
        backgroundColor: "#8BC496",
        borderRadius: 16,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Feather
          name="clock"
          size={16}
          color="#FFF"
          style={{ marginRight: 8 }}
        />
        <Text style={{ fontSize: 14, color: "#FFF", fontWeight: "500" }}>
          {time}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          color: "#FFF",
          marginBottom: 4,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
      {participants && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "flex-end",
          }}
        >
          {participants.map((participant, index) => (
            <Image
              key={participant.id}
              source={{ uri: participant.avatar }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                marginLeft: index > 0 ? -8 : 0,
                borderWidth: 2,
                borderColor: "#1a7de7",
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};
