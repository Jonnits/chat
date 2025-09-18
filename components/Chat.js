import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import AudioMessage from './AudioMessage';
import ImageViewer from './ImageViewer';

const Chat = ({ route, db, storage, isConnected }) => {
  // Extract user data from navigation parameters
  const { userID, name, backgroundColor } = route.params || {};
  
  // State to hold chat messages
  const [messages, setMessages] = useState([]);
  
  // State for image viewer
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

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
        console.log(`Received ${querySnapshot.size} messages from Firestore`);
        
        const newMessages = [];
        querySnapshot.forEach(doc => {
          const messageData = doc.data();
          // Only log message type, not full data
          const messageType = messageData.image ? 'image' : 
                             messageData.location ? 'location' : 
                             messageData.audio ? 'audio' : 'text';
          console.log(`Message ${doc.id}: ${messageType}`);
          
          newMessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt?.toDate() || new Date(),
            user: messageData.user,
            image: messageData.image,
            location: messageData.location,
            audio: messageData.audio,
          });
        });
        
        console.log(`Setting ${newMessages.length} messages in state`);
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
    if (isConnected) {
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainer}
          primaryStyle={styles.inputToolbarPrimary}
          textInputStyle={styles.textInput}
          textInputProps={{
            style: styles.textInput,
            placeholder: 'Hi!',
            placeholderTextColor: '#999',
            textAlign: 'left',
            textAlignVertical: 'left',
          }}
        />
      );
    }
    else return null;
  };

  // Render custom actions component
  const renderActions = () => (
    <CustomActions
      storage={storage}
      db={db}
      userID={userID}
      onSend={onSend}
      isConnected={isConnected}
    />
  );

  // Render custom view for location messages
  const renderCustomView = (props) => (
    <CustomView {...props} />
  );

  // Render custom audio messages
  const renderMessageAudio = (props) => (
    <AudioMessage currentMessage={props.currentMessage} />
  );

  // Render custom image messages
  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    if (currentMessage.image) {
      return (
        <TouchableOpacity 
          style={{ margin: 3 }}
          onPress={() => {
            setSelectedImage(currentMessage.image);
            setImageViewerVisible(true);
          }}
        >
          <Image
            source={{ uri: currentMessage.image }}
            style={{
              width: 200,
              height: 150,
              borderRadius: 10,
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#090C08' }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderMessageAudio}
        renderMessageImage={renderMessageImage}
        onSend={onSend}
        user={{
          _id: userID,
          name: name,
        }}
      />
      <ImageViewer
        visible={imageViewerVisible}
        imageUri={selectedImage}
        onClose={() => {
          setImageViewerVisible(false);
          setSelectedImage(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputToolbarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputToolbarPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});

export default Chat;