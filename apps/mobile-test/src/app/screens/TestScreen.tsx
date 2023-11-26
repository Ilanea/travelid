import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../provider/AuthProvider';
import { getUserById } from '../services/UserApi';


const TestScreen: React.FC = () => {
  const { authState } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = authState?.user?.id;
        const user = await getUserById(userId);
  
        setUserName(user.userName);
  
        console.log('User:', user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [authState]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Test Screen!</Text>
      <Text style={styles.userNameText}>{`User Name: ${userName}`}</Text>
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
  userNameText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default TestScreen;
