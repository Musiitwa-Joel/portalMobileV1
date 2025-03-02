"use client";

import { useEffect, useRef, useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface AudioWaveformProps {
  isRecording: boolean;
  audioData: number[];
}

export function AudioWaveform({ isRecording, audioData }: AudioWaveformProps) {
  const animatedValues = useRef<Animated.Value[]>([]);

  useEffect(() => {
    // Ensure audioData is an array and not empty
    if (!Array.isArray(audioData) || audioData.length === 0) {
      return;
    }

    // Ensure we have enough animated values
    while (animatedValues.current.length < audioData.length) {
      animatedValues.current.push(new Animated.Value(0));
    }

    // Animate to new values
    if (isRecording) {
      Animated.parallel(
        audioData.map((value, index) =>
          Animated.timing(animatedValues.current[index], {
            toValue: value,
            duration: 100,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }, [isRecording, audioData]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      flex: 1,
    },
    bar: {
      width: 3,
      height: 40,
      marginHorizontal: 1,
      backgroundColor: "#075E54",
      borderRadius: 3,
    },
  });

  const bars = useMemo(() => {
    if (!Array.isArray(audioData) || audioData.length === 0) {
      return null;
    }

    return audioData.map((_, index) => (
      <Animated.View
        key={index}
        style={[
          styles.bar,
          {
            transform: [
              {
                scaleY:
                  animatedValues.current[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                  }) || 0.1,
              },
            ],
          },
        ]}
      />
    ));
  }, [audioData, styles.bar]);

  return <View style={styles.container}>{bars}</View>;
}
