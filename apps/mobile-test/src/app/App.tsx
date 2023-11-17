import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate authentication check
  useEffect(() => {
    const checkAuthentication = () => {
      // Check if the user is authenticated
      // For example, check if the user is logged in or has a valid token
      // Set isAuthenticated accordingly
      // setIsAuthenticated(true); // Uncomment this line to simulate an authenticated user
    };

    // Perform the authentication check on app start
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
};

export default App;