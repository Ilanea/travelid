import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar, TextInput, TouchableOpacity, Button, Switch } from 'react-native';
import { theme } from '../theme/theme.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { UserData } from '../utils/internalFunctions.js';
import { UserProviderClass } from "../provider/UserProvider"

export default function BonuspunktePage() {

  const test = new UserProviderClass()
  const navigation = useNavigation();

  const user = new UserData();

  const [points, onChangePoints] = React.useState(user.bonusPoints.toFixed(2));
  const [level, onChangeLevel] = React.useState(1);
  const [levelPoints, onChangeLevelPoints] = React.useState(200);
  const [submitText, onChangeSubmit] = React.useState()

async function test1() { 
  return(await SecureStore.getItemAsync("userinfo"))}

  const result = test1()
  function handleLevelUp() {

    onChangePoints((Number(points) + 100).toFixed(2))

    onChangeLevelPoints(Number(levelPoints-100))
    onChangeSubmit("")

    if(levelPoints == 100) {
      if(level < 3) {
        onChangeLevel(level+1)
      }
      onChangeLevelPoints(400)
    }
  }

  function handleLevelImage() {
    
    switch(level) {
      case 1: 
        return(require("../pics/MEMB_Level1.png"));
      case 2: 
       return(require("../pics/MEMB_Level2.png"));
      case 3:
        return(require("../pics/MEMB_Level3.png"));
      }
  }

  return (

    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent" // Set the background color to "transparent"
      />
      <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          style={{flex: 1}}
      >
      <Text style={ styles.headline }>
        Membership
      </Text>
      <View style={{ width: "100%", alignItems: "flex-start"}}>
        <Image style={styles.membershipImage} source={handleLevelImage()} />
      </View>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <Text style={ styles.totalPoints }>
          Total Points
        </Text>
        <Text style={styles.membershipPoints}>
          {points}
        </Text>
      </View>
      <View style={ styles.codeContainer }>
        <TextInput style={ styles.codeInput } placeholder="enter code to add points" defaultValue={submitText} />
        <TouchableOpacity style={ styles.submitButton } onPress={async() => console.log(result, 100)}>
          <Text style={ styles.submitButtonText }>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={ styles.middleContainer }>
        <View style={ styles.informationContainer }>
          <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
          >
          <Text style={ styles.informationPoints }>
            {levelPoints}
          </Text>
          <Text style={ styles.informationText }>
            Points to the next {"\n"}Checkpoint
          </Text>
          </LinearGradient>
          
        </View>
        <View style={ styles.informationContainer }>
          <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
          >
          <Text style={ styles.informationPoints }>
            40
          </Text>
          <Text style={ styles.informationText }>
          Points used on {"\n"}Goodies
          </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={ styles.middleContainer }>
        <View style={ styles.informationContainer }>
          <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
          >
          <Text style={ styles.informationPoints }>
            50
          </Text>
          <Text style={ styles.informationText }>
            Overnight Stays          
          </Text>
          </LinearGradient>
        </View>
        <View style={ styles.informationContainer }>
          <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
          >
          <Text style={ styles.informationPoints }>
            3
          </Text>
          <Text style={ styles.informationText }>
            Upcoming {"\n"}Reservations
          </Text>
          </LinearGradient>
        </View>
      </View>

      {
        //main Buttons
      }  
      <View style={styles.bottomContainer}>
        <View style={styles.mainButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={styles.mainButtonLeft}>
              <FontAwesome5 name="home" size={24} color="white" />
            </View>
          </TouchableOpacity>
        <View style={styles.mainButtonSeparator} />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.mainButtonMiddle}>
                <FontAwesome5 name="user" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.mainButtonSeparator} />
          <View style={styles.mainButtonRight}>
              <Text style={{ color: 'white' }}>Points</Text>
          </View>
        </View>
      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundLightBlue,
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  headline: {
    textAlign: "center",
    fontSize: 20,
    top: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  totalPoints: {
    fontSize: 16,
    marginRight: 30,
    color: "#647282",
    fontWeight: "500"
  },
  membershipImage: {
    height: 215,
    width: 385,
    top: 40
  },
  membershipPoints: {
    fontSize: 45,
    marginRight: 30,
    color: "#647282",
    fontWeight: "500"
  },
  codeContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 40,
    top: 20, 
  },
  codeInput: {
    width: "60%",
    height: 40,
    backgroundColor: "#c0c5cb",
    borderRadius: 10,
    paddingLeft: 20,
  },
  submitButtonText: {
    color: "white",
  },
  submitButton: {
    marginLeft: 20,
    height: 40,
    width: "20%",
    backgroundColor: "#D68C57",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  informationContainer: {
    width: 160,
    height: 120,
    margin: 20,
    borderRadius: 5,
  },
  informationPoints: {
    fontSize: 30, 
    color: "#546A83", 
    marginBottom: 18,
  },
  informationText: {
    fontSize: 14, 
    color: "#546A83",
  },
    //Main buttons
    mainButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: theme.mainButton,
      width: '80%',
      height: 60,
      marginTop: '10%',
      marginBottom: "7%"
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
