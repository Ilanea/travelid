import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

export default function Results() {
  return (
    <View style={styles.stackContainer}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      
      <Image
        source={require('../pics/background_results.png')}
        style={styles.stackImage}
      />
      <View style={styles.searchContainer}>
        <View style={styles.imageContainer}>
          <Image
              source={require('../pics/aquadome.jpg')} // Use require to specify the image source
              style={styles.imageStyle}
          />
          <Text style={{fontWeight: "bold"}}>
            Details
          </Text>
          <Text numberOfLines={4} style={{ width: 350 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
          </Text>
        </View>  
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  stackContainer: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
  },
  stackImage: {
    width: '100%',
    height: '19%',
  },
  searchContainer: {
    position: 'absolute',
    top: '15%', // Set the top to match the height of stackImage
    left: 0,
    right: 0,
    height: "100%",
    bottom: 0, // Occupy the remaining space at the bottom
    backgroundColor: theme.backgroundLightBlue,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // You can adjust other styles of the searchContainer as needed
  },
  imageStyle: {
    height: 200,
    width: 350,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: 20,
    top: 40
  }
});

