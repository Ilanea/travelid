import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Redirect, router } from 'expo-router';

/*export default function startup() {
  return 
  <AuthProvider>
    <Redirect></Redirect>
  </AuthProvider>
}*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth;

  //return <Redirect href='(tabs)/Login'></Redirect>;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
