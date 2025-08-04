import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;