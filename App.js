import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import Start from './components/Start';
import Chat from './components/Chat';
import { db, storage } from './firebase';
import { disableNetwork, enableNetwork } from 'firebase/firestore';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('🌐 Network state changed:', {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details
      });
      
      setIsConnected(state.isConnected);
      
      // Disable/enable Firestore network based on connection
      if (state.isConnected) {
        console.log('✅ Enabling Firestore network');
        enableNetwork(db);
      } else {
        console.log('❌ Disabling Firestore network');
        disableNetwork(db);
      }
    });

    // Initial connection check
    NetInfo.fetch().then(state => {
      console.log('🌐 Initial network state:', {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type
      });
      
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        console.log('✅ Initial: Enabling Firestore network');
        enableNetwork(db);
      } else {
        console.log('❌ Initial: Disabling Firestore network');
        disableNetwork(db);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen with no header */}
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        {/* Chat screen with dynamic header based on user data */}
        <Stack.Screen
          name="Chat"
          options={({ route }) => ({
            title: route.params?.name || 'Chat',
            headerStyle: {
              backgroundColor: route.params?.backgroundColor || '#090C08',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
            },
          })}
        >
          {props => <Chat {...props} db={db} storage={storage} isConnected={isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;