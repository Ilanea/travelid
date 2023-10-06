import {  StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '../theme/theme.js';
import { getUserData,  } from '../utils/apiFunctions.js';
import React from 'react'
import { formatDate } from '../utils/internalFunctions.js';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons'; 


//platzhalter für später, soll user daten simulieren.
const user = getUserData()

export default function Home() {

  const [value, onChangeText] = React.useState('');
  const [chosenDateStart, onChangeDateStartk] = React.useState(new Date);

  const date = new Date() //creates new reference to the Date Object to use as End Date by adding a week to today
  date.setDate(date.getDate() + 7)

  const [chosenDateEnd, onChangeDateEnd] = React.useState(date);
  const [formattedDate, changeFormattedDate] = React.useState(formatDate(chosenDateStart, chosenDateEnd)); 
  const [amountGuests, onChangeAmountGuests] = React.useState(2); 
   
  return (

      <ScrollView contentContainerStyle={styles.container}> 
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.topContainer}>
          <Link href="screens/Profile" asChild>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={require('../pics/doggo.jpg')} // Use require to specify the image source
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </Link>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 13, paddingLeft: 40}}>
            Hello {user.firstname}!
          </Text> 
          <TouchableOpacity style={styles.notificationIcon}>
            <FontAwesome5 name="bell" size={24} color="black" /> 
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            onChangeText={onChangeText}
            value={value}
            placeholder="Location"
            placeholderTextColor="black"
          />
          <TextInput 
            style={styles.searchInput}
            onChangeText={changeFormattedDate}
            value={value}
            placeholder= {formattedDate}
            editable = {false}
            placeholderTextColor="black"
          />
          <View style={ styles.guestsInputView }>
            <TextInput 
              style={{ fontSize: 18,}}
              onChangeText={onChangeAmountGuests}
              value={value}
              placeholder={amountGuests + " Guests"}
              editable = {false}
              placeholderTextColor="black"
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
              <TouchableOpacity onPress={() => onChangeAmountGuests(amountGuests + 1)}>
                <Text style={{ fontSize: 30, paddingRight: 5 }}>+</Text>
              </TouchableOpacity>
              <View style={{ borderRightWidth: 1, borderColor: "black", height: 30, marginHorizontal: 10 }}></View>
              <TouchableOpacity onPress={() => onChangeAmountGuests(amountGuests > 1 ? amountGuests - 1 : amountGuests - 0)}>
                <Text style={{ fontSize: 30, paddingLeft: 5 }}>─</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
   
      <View style={styles.bottomContainer}>
        
      </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
    justifyContent: "flex-start", // Align items vertically with space-between
    keyboardShouldPersistTaps:"handled"
  },
  topContainer: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  searchContainer: {
    padding: 20,  
  },
  bottomContainer: {

    backgroundColor: theme.backgroundDarkBlue,
    height: 400,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute', // Use absolute positioning for the bottomContainer
    bottom: 0, // Position it at the bottom
    left: 0, // Align it with the left edge of the container
    right: 0, // Align it with the right edge of the container
  },
  guestsInputView: {
    flexDirection: 'row',
    backgroundColor: "white",
    marginBottom: 13,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    alignItems: "center"
  },
  button: {
    backgroundColor: theme.casualButton,
    marginHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 100,    
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  },
  profileButton: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 40,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginLeft: 25
  },
  buttonImage: {
    width: 50,
    height: 50,
    borderRadius: 40
  },
  searchInput: {
    backgroundColor: "white",
    marginBottom: 13,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  notificationIcon: {
    position: 'absolute',
    top: 10,  // Adjust the top value to position the icon vertically
    right: 20, // Adjust the right value to position the icon horizontally
    backgroundColor: "white",
    borderRadius: 60,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginLeft: 25,
    padding: 10
  },
});
