import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../provider/AuthProvider';
import Welcome from '../screens/Welcome';
//import RegisterScreen from '../screens/RegisterScreen';
import RegisterStep2 from '../screens/RegisterStep2';
import RegisterStep3Optional from '../screens/RegisterStep3Optional';
import RegisterStep1 from '../screens/RegisterStep1';
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
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep2" component={RegisterStep2} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep3Optional" component={RegisterStep3Optional} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterStep1" component={RegisterStep1} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
