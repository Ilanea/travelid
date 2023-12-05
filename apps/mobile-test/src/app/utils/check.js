import { useNavigation } from '@react-navigation/native';
import { retrieveUserInfo, changeData } from '../utils/apiFunctions.js';
import {
  StyleSheet,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default function Check() {


    const navigation = useNavigation();

    async function handleTime() {
        if( await SecureStore.getItemAsync("newAcc") == "false" ) {
            navigation.navigate("Home")
        } 
        else { 
            navigation.navigate("RegisterStep2")  
    }
  }

  handleTime()
    
}

const styles = StyleSheet.create({

 
});
