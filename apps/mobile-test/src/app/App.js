import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './navigation/MainNavigator';
import { AuthProvider, useAuth } from './provider/AuthProvider';

const App = () => {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
