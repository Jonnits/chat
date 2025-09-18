import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Start = ({ navigation }) => {
  // State for user input and background color selection
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#090C08');
  
  // Available background color options
  const backgroundColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // Function to navigate to Chat screen with simple user ID
  const signInUser = () => {
    navigation.navigate('Chat', {
      userID: Date.now().toString(), // Simple timestamp-based user ID
      name: name || 'Anonymous', // User's entered name or default
      backgroundColor: selectedColor // Selected background color
    });
    Alert.alert('Entered chat. Be nice!');
  };

  return (
    <SafeAreaProvider>
      {/* Background image container */}
      <ImageBackground 
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              {/* App title */}
              <Text style={styles.title}>Chat App</Text>
              
              {/* White container box with all input elements */}
              <View style={styles.whiteBox}>
                {/* Name input section */}
                {Platform.OS === 'ios' ? (
                  <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
                    <View style={styles.inputSection}>
                      <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Type your name here"
                        placeholderTextColor="rgba(117, 112, 131, 0.5)"
                      />
                    </View>
                  </KeyboardAvoidingView>
                ) : (
                  <View style={styles.inputSection}>
                    <TextInput
                      style={styles.input}
                      onChangeText={setName}
                      value={name}
                      placeholder="Type your name here"
                      placeholderTextColor="rgba(117, 112, 131, 0.5)"
                    />
                  </View>
                )}

                {/* Background color selection section */}
                <View style={styles.colorSection}>
                  <Text style={styles.label}>Choose background color</Text>
                  <View style={styles.colorOptions}>
                    {backgroundColors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorOption,
                          { backgroundColor: color },
                          selectedColor === color && styles.selectedColor
                        ]}
                        onPress={() => setSelectedColor(color)}
                      />
                    ))}
                  </View>
                </View>

                {/* Start chatting button */}
                <TouchableOpacity style={styles.button} onPress={signInUser}>
                  <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { 
    flex: 1, 
    width: '100%', 
    height: '100%',
    backgroundColor: '#090C08'
  },

  safeArea: { 
    flex: 1 },

  keyboardAvoidingView: { 
    flex: 1 },

  scrollContent: { 
    flexGrow: 1, 
    justifyContent: 'center' },

  content: { 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: '6%', 
    paddingTop: 40, 
    paddingBottom: '6%' },

  whiteBox: { 
    backgroundColor: '#FFFFFF', 
    width: '100%', 
    height: '44%', 
    borderRadius: 8, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5 },

  title: { 
    fontSize: 45, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    textAlign: 'center', 
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: -1, height: 1 }, 
    textShadowRadius: 10 },

  inputSection: { 
    width: '88%', 
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center' },

  colorSection: { 
    width: '100%', 
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center' },

  label: { 
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083', 
    marginBottom: 15, 
    textAlign: 'center' },

  input: { 
    height: 50, 
    width: '100%', 
    minWidth: '100%',
    borderWidth: 1, 
    borderColor: '#757083', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    color: '#757083',
    flexShrink: 0 },

  colorOptions: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 20 },

  colorOption: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    borderWidth: 3, 
    borderColor: 'transparent' },

  selectedColor: { 
    borderColor: '#757083' },

  button: { 
    backgroundColor: '#757083', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    width: '88%',
    flex: 1,
    justifyContent: 'center' },

  buttonText: { 
    color: '#FFFFFF', 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: '600' },

});

export default Start;