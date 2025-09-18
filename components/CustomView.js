import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomView = ({ currentMessage }) => {
  if (currentMessage.location) {
    return (
      <View style={styles.container}>
        <Text style={styles.locationText}>
          📍 Location: {currentMessage.location.latitude.toFixed(6)}, {currentMessage.location.longitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinatesText}>
          Lat: {currentMessage.location.latitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinatesText}>
          Long: {currentMessage.location.longitude.toFixed(6)}
        </Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 13,
    margin: 3,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  coordinatesText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default CustomView;
