import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../provider/AuthProvider';
import BonuspunktePage from '../screens/BonuspunktePage';
import Booking from '../screens/Booking';
import Home from '../screens/Home';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import Profile from '../screens/Profile';
import RegisterStep1 from '../screens/RegisterStep1';
import RegisterStep2Optional from '../screens/RegisterStep2';
import RegisterStep3 from '../screens/RegisterStep3Optional';
import Results from '../screens/Results';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

const MainNavigator = () => {
  
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
     <  >
      <Stack.Screen
      name="RegisterStep2"
      component={RegisterStep2Optional}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterStep3Optional"
      component={RegisterStep3}
      options={{ headerShown: false }}
    />

     <Stack.Screen
     name="Home"
     component={Home}
     options={{ headerShown: false }}
   />
   <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{
          headerTransparent: true,
          headerTitle: 'Innsbruck',
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          headerTintColor: "white"
        }}
      />
      <Stack.Screen
        name="BonuspunktePage"
        component={BonuspunktePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(84, 106, 131, 0.5)',
          },
          headerTintColor: "white"
        }}/>
     
      </>
      ) : (
        <>  
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterStep1"
            component={RegisterStep1}
            options={{ headerShown: false }}
          />
    
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
