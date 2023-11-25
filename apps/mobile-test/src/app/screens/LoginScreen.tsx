//import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  /*
Image,
KeyboardAvoidingView,
Platform,
Pressable,
SafeAreaView,
ScrollView,*/
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../provider/AuthProvider';
import { theme } from '../theme/theme.js';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    if (onLogin) {
      try {
        await onLogin(email, password);
        console.log('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.error('onLogin is undefined');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.backgroundLightBlue}
      />

      <View style={styles.middleContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.normalInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Passwort</Text>
        <TextInput
          style={styles.normalInput}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity>
          <Text
            style={{
              borderWidth: 2,
              borderColor: 'black',
              marginTop: 30,
              padding: 5,
            }}
            onPress={handleLogin}
          >
            Test
          </Text>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.registerLink}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center content vertically
  },
  text: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 15,
  },
  normalInput: {
    marginTop: 8,
    width: '60%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  registerLink: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default LoginScreen;
