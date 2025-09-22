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

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Firebase account

### 1. Development Environment Setup

#### Install Expo CLI
```bash
npm install -g @expo/cli
```

#### Install Android Studio
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Set up Android SDK and emulator
3. Configure environment variables (ANDROID_HOME)

#### Install Xcode (macOS only)
1. Download from Mac App Store
2. Install Xcode Command Line Tools: `xcode-select --install`

### 2. Project Setup

#### Clone and Install Dependencies
```bash
git clone <your-repo-url>
cd chat
npm install
```

#### Install Expo Go App
- **iOS**: Download from App Store
- **Android**: Download from Google Play Store

### 3. Database Configuration (Firebase)

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable the following services:
   - **Authentication** (Anonymous sign-in)
   - **Firestore Database** (Start in test mode)
   - **Storage** (Start in test mode)

#### Configure Firebase Credentials
1. In Firebase Console, go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</> icon)
4. Register your app and copy the config object
5. Create a `.env` file in the project root:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

#### Configure Firestore Security Rules
In Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document} {
      allow read, write: if true; // For development only
    }
  }
}
```

#### Configure Storage Security Rules
In Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

### 4. Running the App

#### Start Development Server
```bash
npm start
# or
expo start
```

#### Run on Device/Emulator
- **iOS**: Press `i` in terminal or scan QR code with Camera app
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal

### 5. Troubleshooting

#### Common Issues
- **Metro bundler issues**: Run `expo start --clear`
- **Firebase connection**: Verify `.env` file and credentials
- **Android emulator**: Ensure Android Studio and SDK are properly installed
- **iOS simulator**: Ensure Xcode is installed and simulator is running

#### Dependencies Issues
If you encounter dependency conflicts:
```bash
npm install --legacy-peer-deps
# or
npx expo install --fix
```

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

## Contributing

This is an educational project. While it's not open for external contributions, feedback and suggestions are welcome!

## Author

**Jon Rubra**
- Portfolio: [jonnits/chat](https://github.com/jonnits/chat)
- GitHub: [@jonnits](https://github.com/jonnits)

