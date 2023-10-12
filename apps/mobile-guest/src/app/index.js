  import { Redirect } from 'expo-router';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from 'expo-router/native-stack';  // Update the import

const Stack = createNativeStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {<Redirect href='./screens/Home'></Redirect>}
          <Stack.Screen name="Home" />
          {/* Add other screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
