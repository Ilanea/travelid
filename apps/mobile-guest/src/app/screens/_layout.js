import { Redirect, Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'expo-status-bar';

export default function AboutLayout() {
  return <Stack>
    <Stack.Screen name="Home" options={{
        headerShown: false
    }} />
    <Stack.Screen name="Profile" options={{
        headerShown: false
    }} />
    <Stack.Screen name="About" options={{
        headerTransparent: true,
        
        headerStyle:{
          height:200,         
          backgroundColor: 'red'
        }
    }}/>

  </Stack>;
  
}
 