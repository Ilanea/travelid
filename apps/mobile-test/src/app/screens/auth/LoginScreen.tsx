import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../provider/AuthProvider'; // Replace with the actual path

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" />
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.registerLink}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  registerLink: {
    color: 'blue',
    marginTop: 10,
  },
});

export default LoginScreen;