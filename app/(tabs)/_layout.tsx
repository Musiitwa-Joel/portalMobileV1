import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import AppContext from "../context/AppContext";

export default function RootLayout() {
  const [studentFile, setStudentFile] = useState(null);
  const colorScheme = useColorScheme();

  // Define light and dark theme header styles
  const lightThemeHeaderStyle = {
    backgroundColor: "#fff",
  };

  const darkThemeHeaderStyle = {
    backgroundColor: "#1a1a1a",
  };

  // Choose the appropriate theme based on the color scheme
  const headerStyle =
    colorScheme === "dark" ? darkThemeHeaderStyle : lightThemeHeaderStyle;

  return (
    <AppContext.Provider
      value={{
        studentFile,
        setStudentFile,
      }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot_password"
          options={{
            title: "Forgot Password",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="generate_prt"
          options={{
            title: "Generate PRT",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="prt_details"
          options={{
            title: "PRT Details",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            title: "My Results",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="registration"
          options={{
            title: "Self Registration",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="faq"
          options={{
            title: "Faq",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />

        <Stack.Screen
          name="services"
          options={{
            title: "Services",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="program_change"
          options={{
            title: "Program Change",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="request_change"
          options={{
            title: "Request Change",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="change_history"
          options={{
            title: "Change History",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="new_id"
          options={{
            title: "New ID",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="new_id_request"
          options={{
            title: "ID Request",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="id_request_history"
          options={{
            title: "History",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="refund"
          options={{
            title: "Refund",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />

        <Stack.Screen
          name="biodata"
          options={{
            title: "Bio Data",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="agree_terms"
          options={{
            title: "Terms & Conditions",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="refund_status"
          options={{
            title: "Refund Status",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="new_refund"
          options={{
            title: "Refund Details",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="refund_list"
          options={{
            title: "Refund History",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="new_feature"
          options={{
            title: "New Feature",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="timetable"
          options={{
            title: "Time Table",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="finance"
          options={{
            title: "Finance",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="enrollment"
          options={{
            title: "Enrollment",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="history-modal"
          options={{
            title: "",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="student_scan"
          options={{
            title: "Security",
            headerShown: false,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="counselling"
          options={{
            title: "Counselling",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="speciality"
          options={{
            title: "Speciality",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="counselor_profile"
          options={{
            title: "",
            headerShown: true,
            headerStyle: headerStyle,
          }}
        />
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
            headerStyle: headerStyle,
            title: "Chat",
          }}
        />
        <Stack.Screen
          name="ledger"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Ledger",
          }}
        />
        <Stack.Screen
          name="invoices"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Invoices",
          }}
        />
        <Stack.Screen
          name="transactions"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Transactions",
          }}
        />
        <Stack.Screen
          name="fees-structure"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Fees Structure",
          }}
        />
        <Stack.Screen
          name="statistics"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Statistics",
          }}
        />
        <Stack.Screen
          name="refunds"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Refunds",
          }}
        />
        <Stack.Screen
          name="elearning"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "E-Learning",
          }}
        />
        <Stack.Screen
          name="suggestion_box"
          options={{
            headerShown: true,
            headerStyle: headerStyle,
            title: "Suggestion Box",
          }}
        />
      </Stack>
    </AppContext.Provider>
  );
}
