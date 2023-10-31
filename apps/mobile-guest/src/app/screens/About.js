import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { theme } from '../theme/theme.js';
import { Redirect, Stack } from 'expo-router';

export default function About() {
  return (
    <View style={styles.container}>
      <Stack />
      <View style={styles.topContainer}>
        <Image style={styles.image} source={require('../pics/doggo.jpg')} />
        <View style={styles.textOverlay}>
          <Text style={styles.overlayText}>Fabian P</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* Content for the bottom half of the view */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
  },
  topContainer: {
    flex: 1, // Take up half of the available vertical space
    justifyContent: 'center',
    alignItems: 'center',

  },
  bottomContainer: {
    flex: 1, // Take up the other half of the available vertical space
    // Add your styles for the bottom container here
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

textOverlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: 35,

},
overlayText: {
  color: 'white',
  fontSize: 25,
 
},
});
