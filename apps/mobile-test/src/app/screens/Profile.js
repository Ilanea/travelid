import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserData } from '../utils/internalFunctions';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';

import { useAuth } from '../provider/AuthProvider';
import { theme } from '../theme/theme.js';

export default function Profile() {

  const user = new UserData();

  const { authState } = useAuth();
  const navigation = useNavigation();

  
  const [cc, onChangeUser] = React.useState(user);
  const [userName, onChangeName] = React.useState(user.name);
  const [email, onChangeEmail] = React.useState(user.email);
  const [contactNum, onChangeNumber] = React.useState(user.contactNum);

  const handleNameChange = (newName) => {
    onChangeName(newName);
    user.setName(newName); // Call the function to update the name in the User Class
  };

  const handleEmailChange = (newEmail) => {
    onChangeEmail(newEmail);
    user.setEmail(newEmail)
    // Call the function to update the email in the User Class if needed
  };

  const handleContactNumChange = (newContactNum) => {
    onChangeNumber(newContactNum);
    user.setNumber(newContactNum)
    // Call the function to update the contact number in the User Class if needed
  };


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.backgroundLightBlue}
      />
      <View style={styles.topContainer}>
      <Pressable style={styles.logoutButton} onPress={() => navigation.navigate("Welcome")}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            top: 20,
            right: 20,
            width: "100%",
            textAlign: "center"
          }}
        >
          Hello {userName}!
        </Text>
        <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../pics/doggo.jpg')} // Use require to specify the image source
              style={styles.buttonImage}
            />
          </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.text}>Your name</Text>
        <TextInput
          style={styles.normalInput}
          defaultValue={userName}
          onChangeText={handleNameChange}
        />
        <Text style={styles.text}>Contact Number</Text>
        <TextInput
          style={styles.normalInput}
          defaultValue={contactNum}
          onChangeText={handleContactNumChange}
        />
        <Text style={styles.text}>Email Address</Text>
        <TextInput
          style={styles.normalInput}
          defaultValue={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.normalInput} defaultValue='testpass' secureTextEntry={true}/>
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput style={styles.normalInput} defaultValue='testpass' secureTextEntry={true}/>
      </View>
      <View style={styles.mainButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.mainButtonLeft}>
            <FontAwesome5 name="home" size={24} color="white" />
          </View>
          </TouchableOpacity>
          <View style={styles.mainButtonSeparator} />
            <View style={styles.mainButtonMiddle}>
                <FontAwesome5 name="user" size={24} color="white" />
            </View>
          <View style={styles.mainButtonSeparator} />
          <TouchableOpacity onPress={() => navigation.navigate("BonuspunktePage")}>
            <View style={styles.mainButtonRight}>
                <Text style={{ color: 'white' }}>Points</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  
  topContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20, // Adjust the padding for proper spacing
 // Align items vertically in the center
    width: '100%',
    justifyContent: 'center', // Space between elements
    top: 50
  },
  logoutButton: {
    borderRadius: 60,
    padding: 10,
    top: 10,
    left: 30,
    zIndex: 1
  },
  text: {
    marginTop: 30,
    marginLeft: 50,
    fontSize: 18,
    color: "#546A83"
  },
  normalInput: {
    marginTop: 8,
    marginLeft: 50,
    marginRight: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    fontSize: 16
  },
  buttonImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white"
  },
  profileButton: {
    position: 'absolute',
    top: 10, // Adjust the top value to position the icon vertically
    right: 50, // Adjust the right value to position the icon horizontally
    borderRadius: 60,
    marginRight: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2, // Set to a smaller value to make the shadow appear mostly at the bottom
    },
    shadowOpacity: 0.3,
    shadowRadius: 0, // Set to a smaller value to control the spread of the shadow
    elevation: 10,
    marginLeft: 25,
    paddingBottom: 6,
  },  
  
  mainButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: theme.mainButton,
    width: '80%',
    height: 60,
    bottom: "3%",
    alignSelf: "center",
    position: "absolute"
  },
  mainButtonLeft: {
    marginRight: 20,
    padding: 7,
  },
  mainButtonMiddle: {
    marginHorizontal: 20, // Adjust the margin between the middle button and the separators
    padding: 7,
  },
  mainButtonRight: {
    marginLeft: 20,
    padding: 7,
  },
  mainButtonSeparator: {
    width: 3, // Adjust the width of the separator line as needed
    borderColor: 'white', // Add a border color to make it more visible
    borderWidth: 1, // Add a border width to make it more visible
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
