import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserData } from '../utils/internalFunctions';
import { useState, useEffect } from 'react';
import { retrieveUserInfo, changeData } from '../utils/apiFunctions.js';
import { UserProviderClass } from "../provider/UserProvider"
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';

import { useAuth } from '../provider/AuthProvider';
import { theme } from '../theme/theme.js';

export default function Check() {

    const navigation = useNavigation();

    async function handleTime() {
        const result = await retrieveUserInfo("createdAt")
        const date = new Date(result)
        const currentDate = new Date()
        console.log(currentDate.getTime() +"  "+ date.getTime())
        /* if( (currentDate.getTime() +   3600000 - date.getTime()) > 8000 ) {
          console.log( currentDate.getTime() + 3600000 - date.getTime())
            navigation.navigate("Home")
        } 
        else { */
          console.log(date.getTime() - currentDate.getTime())
            navigation.navigate("RegisterStep2")  
    }

  handleTime()
    
}

const styles = StyleSheet.create({

 
});
