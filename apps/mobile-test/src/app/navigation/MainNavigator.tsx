
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

interface MainNavigatorProps {
  isAuthenticated: boolean;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    {/* Add other authenticated screens here */}
  </Stack.Navigator>
);

const NonAuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    {/* Add other non-authenticated screens here */}
  </Stack.Navigator>
);

const MainNavigator: React.FC<MainNavigatorProps> = ({ isAuthenticated }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={isAuthenticated ? AuthStack : NonAuthStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;