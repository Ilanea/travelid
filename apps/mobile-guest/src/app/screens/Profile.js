import { Pressable, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform  } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react';


export default function Profile() {
  return (
    
        <View style={styles.container}>
            <View style={styles.topContainer}>
          <Link href="screens/Profile" asChild>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={require('../pics/doggo.jpg')} // Use require to specify the image source
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </Link>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 13, paddingLeft: 40}}>
            Hello {user.firstname}!
          </Text> 
          <TouchableOpacity style={styles.notificationIcon}>
            <FontAwesome5 name="bell" size={24} color="black" /> 
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
            <Text style={styles.text}>
                Your name
            </Text>
            <TextInput style={styles.normalInput} />    
            <Text style={styles.text}>
                Contact Number
            </Text>
            <TextInput style={styles.normalInput} />    
            <Text style={styles.text}>
                Email Adress
            </Text>
            <TextInput style={styles.normalInput} />    
            <Text style={styles.text}>
                Password
            </Text>
            <TextInput style={styles.normalInput} />    
            <Text style={styles.text}>
                Confirm Password
            </Text>
            <TextInput style={styles.normalInput} />
        </View>   
        <View style={styles.bottomContainer}>
            <Link href="screens/Home" asChild>
                <TouchableOpacity style={styles.mainButtonLeft}>
                    <FontAwesome5 name="home" size={24} color="#45cfb2" /> 
                </TouchableOpacity>
            </Link>
                <TouchableOpacity style={styles.mainButtonRight}>
                    <FontAwesome5 name="user" size={24} color="black" />
                </TouchableOpacity>
          
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
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 50,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  bottomContainer: {
    alignItems: "flex-end", // Center the content horizontally
    justifyContent: 'center', // Push the content to the bottom of the screen
    marginBottom: 0, // Adjust the margin as needed
    flexDirection: "row"
  },
  text:{
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 15
  },
  normalInput: {
    marginTop: 8,
    marginLeft: 50,
    marginRight: 50,
    borderBottomColor: "black",
    borderBottomWidth: 0.3,
  },
  buttonImage: {
    width: 50,
    height: 50,
    borderRadius: 40
  },
  notificationIcon: {
    position: 'absolute',
    top: 10,  // Adjust the top value to position the icon vertically
    right: 20, // Adjust the right value to position the icon horizontally
    backgroundColor: "white",
    borderRadius: 60,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginLeft: 25,
    padding: 10
  },
  mainButtonLeft: {
    marginRight: 70,
    borderWidth: 1,
    padding: 7,
    marginBottom: 40,
    borderRadius: 40,
    backgroundColor: "white"
  },
  mainButtonRight: {

    padding: 7,
    marginBottom: 40,
  },

});
