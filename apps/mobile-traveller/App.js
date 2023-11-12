const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Welcome from "./(tabs)/Welcome";
import RegisterStep1 from "./(tabs)/RegisterStep1";
import RegisterStep2Optional from "./(tabs)/RegisterStep2Optional";
import RegisterStep3 from "./(tabs)/RegisterStep3";
import Home from "./(tabs)/Home";
import { Link, Stack } from 'expo-router';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterStep1"
              component={RegisterStep1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterStep2Optional"
              component={RegisterStep2Optional}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterStep3"
              component={RegisterStep3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
