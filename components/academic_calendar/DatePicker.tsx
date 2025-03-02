import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useColorScheme } from "react-native";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
}) => {
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={{ fontSize: 16, color: isDark ? "#FFF" : "#1A1A1A" }}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{ backgroundColor: isDark ? "#1A1A1A" : "#FFF" }}
        />
      )}
    </View>
  );
};
