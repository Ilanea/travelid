import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './provider/AuthProvider';
import MainNavigator from './navigation/MainNavigator';

const App: React.FC = () => {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator isAuthenticated={authState?.authenticated ?? false} />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;