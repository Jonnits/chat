# Chat App

A modern React Native chat application built with Expo, featuring real-time messaging, image sharing, location sharing, and offline capabilities.

## Overview

This mobile chat application allows users to easily enter chat rooms and communicate with friends and family. The app provides a seamless messaging experience with support for text, images, and location data, all while maintaining accessibility standards and offline functionality.

## Features

### 🚀 Core Features
- **Easy Onboarding**: Simple name entry and customizable chat background colors
- **Real-time Messaging**: Instant text messaging with friends and family
- **Image Sharing**: Send photos from device gallery or take new pictures with camera
- **Location Sharing**: Share current location with interactive map view
- **Offline Support**: Read messages offline and sync when connection is restored
- **Accessibility**: Screen reader compatible for users with visual impairments

### 🔧 Technical Features
- Anonymous authentication via Firebase
- Real-time data synchronization with Firestore
- Local message storage for offline access
- Cloud image storage with Firebase Cloud Storage
- Cross-platform compatibility (iOS & Android)

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Chat Interface**: Gifted Chat
- **Backend**: Firebase (Authentication, Firestore, Cloud Storage)
- **Local Storage**: AsyncStorage
- **Development**: Expo CLI, Android Studio

## Usage

1. **Start Screen**: Enter your name and select a background color for your chat
2. **Chat Screen**: Send messages, images, and location data
3. **Image Sharing**: Tap the "+" button to access camera or photo library
4. **Location Sharing**: Share your current location via the location icon
5. **Offline Mode**: Previously loaded messages remain accessible without internet

## Dependencies

### Core Dependencies
```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "@react-navigation/native": "^6.0.0",
  "@react-navigation/native-stack": "^6.0.0",
  "react-native-safe-area-context": "4.10.1"
}
```

### Upcoming Dependencies
- `react-native-gifted-chat` - Chat interface
- `firebase` - Backend services
- `@react-native-async-storage/async-storage` - Local storage
- `expo-image-picker` - Image selection
- `expo-location` - Location services
- `react-native-maps` - Map integration

## User Stories Addressed

- **Easy Chat Entry**: Users can quickly enter their name and join the chat
- **Message Exchange**: Send and receive messages with friends and family
- **Image Sharing**: Share photos to show current activities
- **Location Sharing**: Share location with friends
- **Offline Reading**: Access messages without internet connection
- **Accessibility**: Screen reader compatibility for visual impairments

## Contributing

This is an educational project. While it's not open for external contributions, feedback and suggestions are welcome!

## Author

**Jon Rubra**
- Portfolio: [jonnits/chat](https://github.com/jonnits/chat)
- GitHub: [@jonnits](https://github.com/jonnits)

