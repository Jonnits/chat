import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, db, isConnected }) => {
  // Extract user data from navigation parameters
  const { userID, name, backgroundColor } = route.params || {};
  
  // State to hold chat messages
  const [messages, setMessages] = useState([]);

  // Cache key for AsyncStorage
  const CACHE_KEY = 'chat_messages';

  // Load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedMessages) {
        const parsedMessages = JSON.parse(cachedMessages);
        // Convert string dates back to Date objects
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
        setMessages(messagesWithDates);
        console.log('Loaded', messagesWithDates.length, 'cached messages');
      }
    } catch (error) {
      console.error('Error loading cached messages:', error);
    }
  };

  // Cache messages to AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(messagesToCache));
      console.log('Cached', messagesToCache.length, 'messages to AsyncStorage');
    } catch (error) {
      console.error('Error caching messages:', error);
    }
  };

  // Set up message listener on component mount
  useEffect(() => {
    if (isConnected) {
      console.log('Setting up Firestore listener...');
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log('Received', querySnapshot.size, 'messages from Firestore');
        
        const newMessages = [];
        querySnapshot.forEach(doc => {
          const messageData = doc.data();
          console.log('Message data:', messageData);
          
          newMessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt?.toDate() || new Date(),
            user: messageData.user
          });
        });
        
        setMessages(newMessages);
        // Cache messages whenever received from Firestore
        cacheMessages(newMessages);
      });
    
      return () => unsubscribe();
    } else {
      // Load cached messages when offline
      console.log('Offline mode: loading cached messages');
      loadCachedMessages();
    }
  }, [db, isConnected]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    if (!isConnected) {
      console.log('Cannot send message: offline');
      return;
    }

    console.log('Attempting to send message:', newMessages[0]);
    
    // Add new message to Firestore collection
    addDoc(collection(db, "messages"), {
      ...newMessages[0],
      createdAt: serverTimestamp(),
    })
    .then((docRef) => {
      console.log('Message sent successfully, ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
  };

  // Custom bubble rendering function for message styling
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" }, // User's messages in black
        left: { backgroundColor: "#FFF" }   // Other users' messages in white
      }}
    />
  );

  // Custom input toolbar rendering - hide when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#090C08' }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={onSend}
        user={{
          _id: userID,
          name: name,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoidingView: { flex: 1 },
});

export default Chat;