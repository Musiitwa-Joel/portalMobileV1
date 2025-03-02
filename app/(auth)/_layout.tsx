import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
// import AppContext from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  const [studentFile, setStudentFile] = useState(null);
  const { token } = useAuth();
  const colorScheme = useColorScheme();

  console.log("token", token);

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
    </Stack>
  );

  // return (
  //   <AppContext.Provider
  //     value={{
  //       studentFile,
  //       setStudentFile,
  //     }}
  //   >
  //     <Stack>
  //       <Stack.Screen
  //         name="dashboard"
  //         options={{
  //           title: "Dashboard",
  //           headerShown: false,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="generate_prt"
  //         options={{
  //           title: "Generate PRT",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="prt_details"
  //         options={{
  //           title: "PRT Details",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="results"
  //         options={{
  //           title: "Results",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="registration"
  //         options={{
  //           title: "Registration",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="calendar"
  //         options={{
  //           title: "Calendar",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="faq"
  //         options={{
  //           title: "Faq",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />

  //       <Stack.Screen
  //         name="services"
  //         options={{
  //           title: "Services",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="program_change"
  //         options={{
  //           title: "Program Change",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="request_change"
  //         options={{
  //           title: "Request Change",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="change_history"
  //         options={{
  //           title: "Change History",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="new_id"
  //         options={{
  //           title: "New ID",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="new_id_request"
  //         options={{
  //           title: "ID Request",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="id_request_history"
  //         options={{
  //           title: "History",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="refund"
  //         options={{
  //           title: "Refund",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />

  //       <Stack.Screen
  //         name="biodata"
  //         options={{
  //           title: "Bio Data",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="agree_terms"
  //         options={{
  //           title: "Terms & Conditions",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="refund_status"
  //         options={{
  //           title: "Refund Status",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="new_refund"
  //         options={{
  //           title: "Refund Details",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="refund_list"
  //         options={{
  //           title: "Refund History",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="new_feature"
  //         options={{
  //           title: "New Feature",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="timetable"
  //         options={{
  //           title: "Time Table",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="finance"
  //         options={{
  //           title: "Finance",
  //           headerShown: true,
  //           headerStyle: headerStyle,
  //         }}
  //       />
  //     </Stack>
  //   </AppContext.Provider>
  // );
}
