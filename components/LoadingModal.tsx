import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const LoadingModal = ({ message = "Loading Student File..." }) => {
  return (
    <View style={{ flex: 0 }}>
      <Modal isVisible={true} animationIn="fadeIn" animationOut="fadeOut">
        {/* Parent View to center the modal content */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Adds a semi-transparent background
          }}
        >
          {/* Inner View for the modal content */}
          <View
            style={{
              backgroundColor: "#fff",
              width: 250, // Adjust the width as needed
              padding: 20, // Add padding for a nice look
              borderRadius: 10, // Rounded corners for modern look
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000", // Add shadow for depth
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5, // For Android shadow
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
              {message}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
