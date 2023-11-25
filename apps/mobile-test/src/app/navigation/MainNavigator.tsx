import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../provider/AuthProvider';
import Welcome from '../screens/Welcome';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterStep1 from '../screens/RegisterStep1';
import RegisterStep2Optional from '../screens/RegisterStep2Optional';
import RegisterStep3 from '../screens/RegisterStep3';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const { authState } = useAuth();
  const [authenticated, setAuthenticated] = useState(authState?.authenticated);

  useEffect(() => {
    console.log('MainNavigator - authState:', authState);
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
          <Stack.Screen name="Mongo" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep1" component={RegisterStep1} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep2Optional" component={RegisterStep2Optional} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep3" component={RegisterStep3} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
