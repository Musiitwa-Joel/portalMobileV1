import React from "react"; // Add this import
import { Stack } from "expo-router";
import HistoryModal from "../../components/Enrollment/EnrollmentTrack";

export default function HistoryModalScreen() {
  return (
    <>
      <Stack.Screen options={{ presentation: "modal" }} />
      <HistoryModal />
    </>
  );
}
