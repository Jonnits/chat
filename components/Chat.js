import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
  // Extract name and backgroundColor from navigation params
  const { name, backgroundColor } = route.params || {};
  
  // State to hold all chat messages
  const [messages, setMessages] = useState([]);

  // useEffect hook to initialize chat with static messages when component mounts
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `${name || 'User'} has entered the chat!`, // System message with user's name
        createdAt: new Date(),
        system: true, // This makes it a system message 
      },
      {
        _id: 2,
        text: "Hello developer", // Welcome message from React Native bot
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, [name]); // Dependency array includes name so it updates if name changes
  
  // Function to handle sending new messages
  // Called when user submits a message through GiftedChat
  const onSend = (newMessages) => {
    setMessages(previousMessages => 
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Custom function to render message bubbles with custom styling
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // User's messages appear in black bubbles
          },
          left: {
            backgroundColor: "#FFF", // Other users' messages appear in white bubbles
          }
        }}
      />
    );
  };

  return (
    // Main container with user-selected background color
    <View style={[styles.container, { backgroundColor: backgroundColor || '#090C08' }]}>
      {Platform.OS === 'ios' ? (
      <KeyboardAvoidingView 
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <GiftedChat
          messages={messages} // Array of messages to display
          renderBubble={renderBubble} // Bubble rendering function
          onSend={messages => onSend(messages)} 
          user={{
            _id: 1, // Current user's ID (matches user who sends messages)
            name: name || 'User', // User's name from Start screen
          }}
        />
      </KeyboardAvoidingView>
      ) : (
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: name || 'User',
        }}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen
  },
  keyboardAvoidingView: {
    flex: 1, 
  },
});

export default Chat;