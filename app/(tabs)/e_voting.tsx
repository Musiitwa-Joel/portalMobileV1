import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function VoterAuthentication() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  // Simulated pre-loaded voter details
  const voterDetails = {
    studentNumber: "2000100121",
    email: "student@example.com",
    phone: "+256 700 000 000"
  };

  const theme = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    primary: '#1a7de7',
    inputBackground: isDark ? '#2d2d2d' : '#f5f5f5',
    border: isDark ? '#404040' : '#e0e0e0',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: theme.text,
      marginBottom: 30,
      fontFamily: 'SharpSansBold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 20,
      fontFamily: 'SharpSansNo1',
      textAlign: 'center',
      opacity: 0.8,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 8,
      fontFamily: 'SharpSansNo1',
    },
    input: {
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
      fontFamily: 'SharpSansNo1',
    },
    button: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'SharpSansBold',
    },
    infoText: {
      color: theme.text,
      textAlign: 'center',
      marginTop: 20,
      fontFamily: 'SharpSansNo1',
      opacity: 0.7,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voter Authentication</Text>
      <Text style={styles.subtitle}>Please verify your voting eligibility</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Student Number</Text>
        <TextInput
          style={styles.input}
          value={voterDetails.studentNumber}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={voterDetails.email}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={voterDetails.phone}
          editable={false}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/e_voting/otp')}
      >
        <Text style={styles.buttonText}>Authenticate & Send OTP</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        An OTP will be sent to your registered email address or phone number
      </Text>
    </View>
  );
}