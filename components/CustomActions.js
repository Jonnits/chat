import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert, Platform } from 'react-native';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CustomActions = ({ storage, db, userID, onSend, isConnected }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const onActionPress = () => {
    const options = [
      'Select an image from library',
      'Take a photo',
      'Record audio',
      'Share location',
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            takePhoto();
            break;
          case 2:
            handleAudioRecording();
            break;
          case 3:
            getLocation();
            break;
        }
      }
    );
  };

  const handleAudioRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      // Ask for permission - use expo-av API
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need microphone permissions to record audio!');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording with expo-av
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      Alert.alert('Recording', 'Recording started. Tap "Record audio" again to stop.');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        await uploadAndSendAudio(uri);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const uploadAndSendAudio = async (uri) => {
    try {
      if (!isConnected) {
        Alert.alert('Offline', 'Cannot upload audio: offline');
        return;
      }

      console.log('Starting audio upload...');

      // Generate unique filename
      const filename = `audio/${Date.now()}_${Math.random().toString(36).substring(7)}.m4a`;
      const storageRef = ref(storage, filename);

      // Read the audio file
      const response = await fetch(uri);
      const blob = await response.blob();

      console.log('Uploading to Firebase Storage...');
      
      // Upload to Firebase Storage
      await uploadBytes(storageRef, blob);
      console.log('Upload successful, getting download URL...');
      
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadURL);

      // Send audio message
      const audioMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'Audio message',
        createdAt: new Date(),
        user: {
          _id: userID,
        },
        audio: downloadURL,
      };

      console.log('Sending audio message...');
      onSend([audioMessage]);
      console.log('Audio message sent successfully!');
      
    } catch (error) {
      console.error('Error uploading audio:', error);
      
      if (error.code === 'storage/no-default-bucket') {
        Alert.alert('Storage Error', 'Firebase Storage not configured. Please check your Firebase setup.');
      } else if (error.code === 'storage/unauthorized') {
        Alert.alert('Storage Error', 'Storage access denied. Please check your Firebase Storage rules.');
      } else {
        Alert.alert('Upload Error', `Error uploading audio: ${error.message}`);
      }
    }
  };

  const pickImage = async () => {
    try {
      console.log('Starting image picker...');
      
      // Ask for permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Media library permission status:', status);
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      console.log('Launching image picker...');
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets[0]) {
        console.log('Image selected, starting upload...');
        await uploadAndSendImage(result.assets[0].uri, 'library');
      } else {
        console.log('Image selection was canceled or failed');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert(`Error picking image: ${error.message}`);
    }
  };

  const takePhoto = async () => {
    try {
      console.log('Starting camera...');
      
      // Ask for permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Camera permission status:', status);
      
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      console.log('Launching camera...');
      
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets[0]) {
        console.log('Photo taken, starting upload...');
        await uploadAndSendImage(result.assets[0].uri, 'camera');
      } else {
        console.log('Photo capture was canceled or failed');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      alert(`Error taking photo: ${error.message}`);
    }
  };

  const getLocation = async () => {
    try {
      console.log('Starting location request...');
      
      // Ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      
      if (status !== 'granted') {
        alert('Sorry, we need location permissions to make this work!');
        return;
      }

      console.log('Getting current position...');
      
      // Get current position
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      console.log('Location obtained:', { latitude, longitude });

      // Send location message
      const locationMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: 'My location',
        createdAt: new Date(),
        user: {
          _id: userID,
        },
        location: {
          latitude,
          longitude,
        },
      };

      console.log('Sending location message...');
      onSend([locationMessage]);
      console.log('Location message sent successfully!');
      
    } catch (error) {
      console.error('Error getting location:', error);
      alert(`Error getting location: ${error.message}`);
    }
  };

  const uploadAndSendImage = async (uri, source) => {
    try {
      if (!isConnected) {
        alert('Cannot upload image: offline');
        return;
      }

      console.log(`Starting image upload from ${source}...`);

      // Check file size (limit to 20MB)
      const response = await fetch(uri);
      const blob = await response.blob();
      
      if (blob.size > 20 * 1024 * 1024) {
        alert('Image too large. Please select an image smaller than 20MB.');
        return;
      }

      console.log(`Image size: ${(blob.size / 1024 / 1024).toFixed(2)}MB`);

      // Generate unique reference
      const filename = `images/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      const storageRef = ref(storage, filename);

      console.log('Uploading to Firebase Storage...');
      console.log('Storage ref:', storageRef);
      console.log('Blob size:', blob.size, 'bytes');
      
      // Upload to Firebase Storage (simplified for debugging)
      await uploadBytes(storageRef, blob);
      console.log('Upload successful, getting download URL...');
      
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadURL);

      // Send image message
      const imageMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
          _id: userID,
        },
        image: downloadURL,
      };

      console.log('Sending image message...');
      onSend([imageMessage]);
      console.log('Image message sent successfully!');
      
    } catch (error) {
      console.error('Error uploading image:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      // Provide more specific error messages
      if (error.code === 'storage/no-default-bucket') {
        alert('Firebase Storage not configured. Please check your Firebase setup.');
      } else if (error.code === 'storage/unauthorized') {
        alert('Storage access denied. Please check your Firebase Storage rules.');
      } else if (error.code === 'storage/unknown') {
        alert(`Storage upload failed. Error details: ${error.message}. Please check your Firebase Storage configuration.`);
      } else {
        alert(`Error uploading image: ${error.message}`);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Opens action sheet with options to select image, take photo, record audio, or share location"
    >
      <Ionicons name="add-circle" size={20} color="#007AFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Wrapper component to provide ActionSheet context
const CustomActionsWrapper = (props) => (
  <ActionSheetProvider>
    <CustomActions {...props} />
  </ActionSheetProvider>
);

export default CustomActionsWrapper;
