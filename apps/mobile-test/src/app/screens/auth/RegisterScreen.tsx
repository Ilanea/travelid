import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../provider/AuthProvider'; // Replace with the actual path

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');


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
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={(text) => setLastname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" />
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