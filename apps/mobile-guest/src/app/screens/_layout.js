import { Redirect, Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'expo-status-bar';

export default function AboutLayout() {
  return <Stack>
    <Stack.Screen name="Home" options={{
        headerShown: false
    }} />
    <Stack.Screen name="About" options={{
        headerTransparent: true,
        
        headerStyle:{
          height:200,            // i tried to put height
          backgroundColor: 'red'
        }
    }}/>
    <Stack.Screen name="Profile" options={{
      title: null,
        headerStyle:{
                    // i tried to put height
        }
    }}/>
  </Stack>;
  
}
 