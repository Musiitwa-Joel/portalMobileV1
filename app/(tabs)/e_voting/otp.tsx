import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    primary: '#1a7de7',
    inputBackground: isDark ? '#2d2d2d' : '#f5f5f5',
    border: isDark ? '#404040' : '#e0e0e0',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (text && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: theme.text,
      marginBottom: 10,
      fontFamily: 'SharpSansBold',
    },
    subtitle: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 30,
      textAlign: 'center',
      fontFamily: 'SharpSansNo1',
      opacity: 0.8,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 30,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 20,
      backgroundColor: theme.inputBackground,
      color: theme.text,
      fontFamily: 'SharpSansNo1',
    },
    timer: {
      fontSize: 18,
      color: theme.primary,
      marginBottom: 20,
      fontFamily: 'SharpSansBold',
    },
    button: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'SharpSansBold',
    },
    resendContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    resendText: {
      color: theme.text,
      marginBottom: 8,
      fontFamily: 'SharpSansNo1',
    },
    resendLink: {
      color: theme.primary,
      fontFamily: 'SharpSansBold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your email/phone
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            name={`otp-${index}`}
          />
        ))}
      </View>

      <Text style={styles.timer}>Time remaining: {formatTime(timeLeft)}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/e_voting/instructions')}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code?</Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}