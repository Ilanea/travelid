import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../provider/AuthProvider';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { authState, onLogout } = useAuth();
  const [authenticated, setAuthenticated] = useState(authState?.authenticated);

  useEffect(() => {
    setAuthenticated(authState?.authenticated);
  }, [authState]);

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      console.log('Logout successful');
    }
  };

  const handleNavigateToTestScreen = () => {
    navigation.navigate('Test');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      {authenticated && (
        <>
          <TouchableOpacity style={styles.testButton} onPress={handleNavigateToTestScreen}>
            <Text style={styles.testButtonText}>Go to Test Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  testButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
