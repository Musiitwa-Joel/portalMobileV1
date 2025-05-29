import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VotingInstructions() {
  const [isChecked, setIsChecked] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const theme = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    primary: '#1a7de7',
    cardBackground: isDark ? '#2d2d2d' : '#f5f5f5',
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
      marginBottom: 20,
      fontFamily: 'SharpSansBold',
    },
    section: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      color: theme.text,
      marginBottom: 12,
      fontFamily: 'SharpSansBold',
    },
    bulletPoint: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    bullet: {
      color: theme.primary,
      marginRight: 8,
      fontSize: 16,
    },
    bulletText: {
      flex: 1,
      color: theme.text,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'SharpSansNo1',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 4,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxText: {
      flex: 1,
      color: theme.text,
      fontSize: 14,
      fontFamily: 'SharpSansNo1',
    },
    button: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      opacity: isChecked ? 1 : 0.5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'SharpSansBold',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Voting Instructions</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Voting Process</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Select your preferred candidate from the list
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Review your selection before submitting
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Confirm your vote with a final submission
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Voting Methods</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Single choice voting for each position
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            One vote per student per position
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Security and Privacy</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Your vote is completely anonymous
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Votes are encrypted and securely stored
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Important Notes</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            You cannot change your vote after submission
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Results will be available after the election ends
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <View style={styles.checkbox}>
          {isChecked && (
            <Ionicons name="checkmark\" size={20} color={theme.primary} />
          )}
        </View>
        <Text style={styles.checkboxText}>
          I have read and understood the voting instructions and agree to proceed with the voting process.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        disabled={!isChecked}
        onPress={() => router.push('/e_voting/elections')}
      >
        <Text style={styles.buttonText}>Proceed to Vote</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}