import { Redirect, Stack, HeaderBackground} from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';



export default function AboutLayout() {
  return <Stack>
    <Stack.Screen name="Home" options={{
        headerShown: false
    }} />
    <Stack.Screen name="Profile" options={{
        headerShown: false,
        headerStyle:{
          height:200, 
        }
    }} />
    <Stack.Screen name="Results" options={{
        headerTitle: "Innsbruck", 
        headerBackground: () => (null),
      }} 
    
    />
    <Stack.Screen name="About" options={{
        headerTransparent: true,
        
        headerStyle:{
          height:200,         
          backgroundColor: 'red'
        }
    }}/>
  </Stack>;
   
}
 