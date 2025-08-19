import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { db } from './firebase';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');

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
          {props => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;