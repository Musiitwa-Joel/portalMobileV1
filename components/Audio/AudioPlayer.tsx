"use client";

import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Play, Pause } from "lucide-react-native";
import { Audio } from "expo-av";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadSound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: audioUrl,
    });
    setSound(newSound);

    const status = await newSound.getStatusAsync();
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
    }
  };

  useEffect(() => {
    loadSound();
  }, [audioUrl, loadSound]); // Added loadSound to dependencies

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
        startPositionUpdate();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startPositionUpdate = () => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
          }
        }
      });
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 20,
      padding: 10,
    },
    playPauseButton: {
      marginRight: 10,
    },
    progressContainer: {
      flex: 1,
    },
    progressBar: {
      height: 3,
      backgroundColor: "#075E54",
      borderRadius: 3,
    },
    timeText: {
      fontSize: 12,
      color: "#666",
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playPauseButton} onPress={playPauseSound}>
        {isPlaying ? (
          <Pause color="#075E54" size={24} />
        ) : (
          <Play color="#075E54" size={24} />
        )}
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(position / duration) * 100}%` },
          ]}
        />
        <Text style={styles.timeText}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
}
