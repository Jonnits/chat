import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Chat = ({ route }) => {
  const { name, backgroundColor } = route.params || {};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome to the chat!
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Chat;
