import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { useAuth } from '../provider/AuthProvider';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const { authState } = useAuth();
  const [authenticated, setAuthenticated] = useState(authState?.authenticated);

  useEffect(() => {
    console.log("MainNavigator - authState:", authState);
    setAuthenticated(authState?.authenticated);
  }, [authState]);

  if (authState === undefined) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {authenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;