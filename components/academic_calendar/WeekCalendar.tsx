import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useColorScheme } from "react-native";

interface WeekCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getDaysArray = (date: Date): Date[] => {
    const days: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const days = getDaysArray(selectedDate);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
      {days.map((day, index) => (
        <Pressable
          key={index}
          onPress={() => onSelectDate(day)}
          style={({ pressed }) => [
            {
              marginRight: 24,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <View
            style={[
              {
                padding: 10,
                borderRadius: 12,
                alignItems: "center",
                backgroundColor:
                  day.toDateString() === selectedDate.toDateString()
                    ? "#1a7de7"
                    : "transparent",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color:
                  day.toDateString() === selectedDate.toDateString()
                    ? "#FFF"
                    : isDark
                      ? "#FFF"
                      : "#1A1A1A",
              }}
            >
              {day.getDate()}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 14,
                color:
                  day.toDateString() === selectedDate.toDateString()
                    ? "#FFF"
                    : "#A1A1A1",
              }}
            >
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};
