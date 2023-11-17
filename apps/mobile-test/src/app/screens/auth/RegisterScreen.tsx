import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../provider/AuthProvider'; // Replace with the actual path
import { useNavigation } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const { onSignup } = useAuth();
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (onSignup) {
      try {
        const result = await onSignup({
          userName,
          email,
          password,
          firstName,
          lastName
        });
  
        console.log('Signup result:', result);
      } catch (error) {
        console.error('Signup failed:', error);
      }
    } else {
      console.error('onSignup is undefined');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
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
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleSignup}/>
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
});

export default RegisterScreen;