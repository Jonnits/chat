import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const Chat = ({ route, db }) => {
  // Extract user data from navigation parameters
  const { userID, name, backgroundColor } = route.params || {};
  
  // State to hold chat messages
  const [messages, setMessages] = useState([]);

  // Set up message listener on component mount for dev
  useEffect(() => {
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
    });
  
    return () => unsubscribe();
  }, [db]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
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

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#090C08' }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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