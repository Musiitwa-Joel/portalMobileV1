import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { WeekCalendar } from "@/components/academic_calendar/WeekCalendar";
import { DatePicker } from "@/components/academic_calendar/DatePicker";
import { ScheduleCard } from "@/components/academic_calendar/ScheduleCard";
import { ReminderCard } from "@/components/academic_calendar/ReminderCard";
import type { ScheduleEvent, ReminderItem } from "@/types/schedule";

const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    time: "08.00",
    title: "Registration of modules ",
    participants: [
      {
        id: "1",
        avatar:
          "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100121",
      },
      {
        id: "2",
        avatar:
          "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100539",
      },
    ],
  },
  {
    id: "2",
    time: "14.00",
    title: "Program Change to students who wish, For First Year Students.",
    participants: [
      {
        id: "1",
        avatar:
          "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041",
      },
      {
        id: "2",
        avatar:
          "https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000100125",
      },
    ],
  },
];

const reminders: ReminderItem[] = [
  {
    id: "1",
    title: "Semester 2 begins",
    timeRange: "12.00 - 16.00",
  },
  {
    id: "2",
    title: "Pespi UFL league resumes",
    timeRange: "12.00 - 16.00",
  },
];

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? "#1A1A1A" : "#FFF" }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <View style={{ marginTop: 24 }}>
            <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
          </View>

          <View style={{ marginTop: 24 }}>
            <WeekCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 16,
                color: isDark ? "#FFF" : "#1A1A1A",
              }}
            >
              Events Today 🌔
            </Text>
            {scheduleEvents.map((event) => (
              <ScheduleCard key={event.id} {...event} />
            ))}
          </View>

          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 8,
                color: isDark ? "#FFF" : "#1A1A1A",
              }}
            >
              Upcoming Events
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#A1A1A1",
                marginBottom: 16,
              }}
            >
              Dont forget to participate in these events
            </Text>
            {reminders.map((reminder) => (
              <ReminderCard key={reminder.id} {...reminder} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
