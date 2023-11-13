import { Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';


export default function AboutLayout() {
  return <Stack>
    <Stack.Screen name="Welcome" options={{
        headerShown: false
    }} />
    <Stack.Screen name="RegisterStep1" options={{
        headerShown: false
    }} />
  </Stack>;
   
}
 