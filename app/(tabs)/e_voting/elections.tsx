import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ElectionStatus = 'ongoing' | 'upcoming' | 'past';

interface Election {
  id: string;
  title: string;
  endTime?: string;
  startTime?: string;
  status: ElectionStatus;
  description: string;
}

export default function Elections() {
  const [activeTab, setActiveTab] = useState<ElectionStatus>('ongoing');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    primary: '#1a7de7',
    cardBackground: isDark ? '#2d2d2d' : '#f5f5f5',
    border: isDark ? '#404040' : '#e0e0e0',
  };

  const elections: Record<ElectionStatus, Election[]> = {
    ongoing: [
      {
        id: '1',
        title: 'Guild Presidential Election 2024',
        endTime: '2024-03-20 18:00:00',
        status: 'ongoing',
        description: 'Vote for your next Guild President',
      },
    ],
    upcoming: [
      {
        id: '2',
        title: 'School Representative Election',
        startTime: '2024-04-01 09:00:00',
        status: 'upcoming',
        description: 'Choose your school representative',
      },
    ],
    past: [
      {
        id: '3',
        title: 'Guild Presidential Election 2023',
        endTime: '2023-03-15 18:00:00',
        status: 'past',
        description: 'Previous Guild Presidential election',
      },
    ],
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    tabContainer: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: theme.cardBackground,
    },
    tab: {
      flex: 1,
      padding: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: theme.primary,
    },
    tabText: {
      color: theme.text,
      fontFamily: 'SharpSansNo1',
    },
    activeTabText: {
      color: '#ffffff',
      fontFamily: 'SharpSansBold',
    },
    content: {
      padding: 16,
    },
    electionCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    electionTitle: {
      fontSize: 18,
      color: theme.text,
      marginBottom: 8,
      fontFamily: 'SharpSansBold',
    },
    electionDescription: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 12,
      fontFamily: 'SharpSansNo1',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    timeText: {
      color: theme.primary,
      marginLeft: 8,
      fontFamily: 'SharpSansNo1',
    },
    actionButton: {
      backgroundColor: theme.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    actionButtonText: {
      color: '#ffffff',
      fontFamily: 'SharpSansBold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {(['ongoing', 'upcoming', 'past'] as ElectionStatus[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {elections[activeTab].map((election) => (
          <View key={election.id} style={styles.electionCard}>
            <Text style={styles.electionTitle}>{election.title}</Text>
            <Text style={styles.electionDescription}>{election.description}</Text>
            
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={20} color={theme.primary} />
              <Text style={styles.timeText}>
                {election.status === 'ongoing' 
                  ? 'Ends: ' + election.endTime
                  : election.status === 'upcoming'
                  ? 'Starts: ' + election.startTime
                  : 'Ended: ' + election.endTime}
              </Text>
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                {election.status === 'ongoing' 
                  ? 'Vote Now'
                  : election.status === 'upcoming'
                  ? 'Reminder'
                  : 'View Results'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}