import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const AudioMessage = ({ currentMessage }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(console.error);
      }
    };
  }, [sound]);

  const playSound = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      // Clean up any existing sound first
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      console.log('Creating new audio sound for:', currentMessage.audio);
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentMessage.audio },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
      
      // Get initial status to set duration
      const status = await newSound.getStatusAsync();
      console.log('Audio status:', status);
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
        setPosition(status.positionMillis || 0);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', `Failed to play audio: ${error.message}`);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentMessage.audio) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.audioButton} onPress={playSound}>
        <Ionicons 
          name={isPlaying ? "pause-circle" : "play-circle"} 
          size={32} 
          color="#007AFF" 
        />
      </TouchableOpacity>
      
      <View style={styles.audioInfo}>
        <Text style={styles.audioText}>Audio Message</Text>
        <Text style={styles.durationText}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 12,
    margin: 3,
    minWidth: 200,
  },
  audioButton: {
    marginRight: 12,
  },
  audioInfo: {
    flex: 1,
  },
  audioText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
});

export default AudioMessage;
