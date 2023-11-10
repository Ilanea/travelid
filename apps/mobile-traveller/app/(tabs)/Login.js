import { Pressable, StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform  } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react';


//username und password sind die variablen fürs einloggen
//wenn du versuchen willst auf den Homescreen zu navigieren änder einfach das TouchableObacity zu:
/* ->       <Link href="/Home" asChild>
                <TouchableOpacity>
                <Text style={{ borderWidth: 2, borderColor: "black", marginTop: 30, padding: 5}}>
                    Test
                </Text>
                </TouchableOpacity>
            </Link>
*/
//zum testen gibts unten das TouchableObacity mit der "onPress" wo du funktionen reinschmeißen kannst

//export default function Login() {

const Login = () =>{

  const [email, setEmail] = useState('');
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();

  const login = async () =>{
    const result = await onLogin!(email, password);
    if (result && result.error){
      alert(result.msg);
    }
  };

  // automatically call the login after succesful registration
  const register = async ()=>{
    const result = await onRegister!(email, password);
    if (result && result.error){
      alert(result.msg);
    } else{
      login();
    }
  };

  return (
    
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={theme.backgroundLightBlue} /> 
         
        <View style={styles.middleContainer}>
            <Text style={styles.text}>
                Benutzername
            </Text>
            <TextInput style={styles.normalInput} 
            onChangeText={(text) => setEmail(text)}
            value={username}
            />    
            <Text style={styles.text}>
                Passwort
            </Text>
            <TextInput style={styles.normalInput}
            secureTextEntry={true}  
            onChangeText={(text) => setPassword(text)}
            value={password}
            />    
            <TouchableOpacity>
                <Text style={{ borderWidth: 2, borderColor: "black", marginTop: 30, padding: 5}} onPress={login} title = "Sign in">
                    Test
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ borderWidth: 2, borderColor: "black", marginTop: 30, padding: 5}} onPress={register} title = "Create Account">
                    Test
                </Text>
            </TouchableOpacity>
        </View>   
       </View>
  );
};

export default Login;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center" // Center content vertically
  },
  text:{
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 15
  },
  normalInput: {
    marginTop: 8,
    width: "60%",
    borderBottomColor: "black",
    borderBottomWidth: 0.3,
  },
});
