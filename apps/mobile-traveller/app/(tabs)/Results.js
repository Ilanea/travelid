import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform  } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react';


export default function Results() {
  return (
    <View style={styles.stackContainer}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Image
            source={require('../pics/background_results.png')} // Use require to specify the image source
            style={styles.stackImage}
        />

        <View style={styles.searchContainer}>
            <Text>
                jo
            </Text>
        </View>
        <View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    stackContainer: {
        flex: 1,
        alignItems: 'center',
      },
      stackImage: {
        width: '100%', // Make the image width 100% of its container
        height: "18%",
 
      },
      searchContainer: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flex: 1,
      }
});
