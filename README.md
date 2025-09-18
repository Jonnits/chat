# Chat App

A modern React Native chat application built with Expo SDK 54.0.0, featuring real-time messaging, image sharing, audio recording, location sharing, and offline capabilities.

## Overview

This mobile chat application allows users to easily enter chat rooms and communicate with friends and family. The app provides a seamless messaging experience with support for text, images, audio messages, and location data, all while maintaining accessibility standards and offline functionality.

## Features

### 🚀 Core Features
- **Easy Onboarding**: Simple name entry and customizable chat background colors
- **Real-time Messaging**: Instant text messaging with friends and family
- **Image Sharing**: Send photos from device gallery or take new pictures with camera
- **Audio Messages**: Record and send voice messages
- **Location Sharing**: Share current location with interactive map view
- **Offline Support**: Read messages offline and sync when connection is restored
- **Accessibility**: Screen reader compatible for users with visual impairments
- **Network Awareness**: Automatic offline/online detection with Firestore sync

### 🔧 Technical Features
- Anonymous authentication via Firebase
- Real-time data synchronization with Firestore
- Local message storage for offline access
- Cloud image and audio storage with Firebase Cloud Storage
- Cross-platform compatibility (iOS & Android)
- Edge-to-edge layouts (Android 16 support)
- Predictive Back Gesture support

## Tech Stack

- **Framework**: React Native 0.81.4 with Expo SDK 54.0.0
- **Navigation**: React Navigation 6.x
- **Chat Interface**: React Native Gifted Chat
- **Backend**: Firebase 11.0.0 (Authentication, Firestore, Cloud Storage)
- **Local Storage**: AsyncStorage
- **Media**: Expo AV, Expo Image Picker, Expo Location
- **Development**: Expo CLI, Android Studio

## Usage

1. **Start Screen**: Enter your name and select a background color for your chat
2. **Chat Screen**: Send messages, images, audio recordings, and location data
3. **Media Sharing**: Tap the "+" button to access:
   - Camera for taking photos
   - Photo library for selecting images
   - Audio recorder for voice messages
   - Location services for sharing current location
4. **Offline Mode**: Previously loaded messages remain accessible without internet
5. **Network Status**: App automatically detects connection and syncs when online

## Dependencies

### Core Dependencies
```json
{
  "expo": "54.0.7",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "firebase": "11.0.0"
}
```

### Navigation & UI
```json
{
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/native-stack": "^6.11.0",
  "react-native-gifted-chat": "2.4.0",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-screens": "~4.16.0",
  "react-native-gesture-handler": "~2.28.0"
}
```

### Media & Storage
```json
{
  "expo-av": "~16.0.7",
  "expo-image-picker": "~17.0.8",
  "expo-location": "~19.0.7",
  "expo-media-library": "~18.1.1",
  "expo-file-system": "~19.0.14",
  "@react-native-async-storage/async-storage": "2.2.0"
}
```

### Utilities
```json
{
  "@react-native-community/netinfo": "^11.4.1",
  "@expo/react-native-action-sheet": "^4.1.1",
  "react-native-dotenv": "^3.4.11"
}
```

### Development
```json
{
  "@babel/core": "^7.20.0",
  "babel-preset-expo": "~12.0.0"
}
```

## User Stories Addressed

- **Easy Chat Entry**: Users can quickly enter their name and join the chat
- **Message Exchange**: Send and receive text messages with friends and family
- **Image Sharing**: Share photos from gallery or take new pictures with camera
- **Audio Messaging**: Record and send voice messages for personal communication
- **Location Sharing**: Share current location with friends via interactive maps
- **Offline Reading**: Access previously loaded messages without internet connection
- **Network Awareness**: Automatic detection of connection status with sync when online
- **Accessibility**: Screen reader compatibility for users with visual impairments
- **Cross-Platform**: Consistent experience across iOS and Android devices

## Contributing

This is an educational project. While it's not open for external contributions, feedback and suggestions are welcome!

## Author

**Jon Rubra**
- Portfolio: [jonnits/chat](https://github.com/jonnits/chat)
- GitHub: [@jonnits](https://github.com/jonnits)

