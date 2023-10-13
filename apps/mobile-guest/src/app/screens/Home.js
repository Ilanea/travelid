import { Pressable, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform  } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import { getUserData } from '../utils/apiFunctions.js';
import React from 'react'
import { formatDate, filterHotels } from '../utils/internalFunctions.js';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
const { parseISO } = require('date-fns')

//platzhalter für später, soll user daten simulieren.
const user = getUserData()

export default function Home() {

  const [value, onChangeText] = React.useState('');

  const date = new Date() //creates new reference to the Date Object to use as End Date by adding a week to today
  date.setDate(date.getDate() + 7)

 
  const [formattedDate, changeFormattedDate] = React.useState(formatDate(new Date, new Date(date))); 
  const [amountGuests, onChangeAmountGuests] = React.useState(2); 
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [hotelList, onChangeHotelList] = useState();

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Function to handle date selection
  const handleDateSelect = (day) => {
    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // Start a new range when no start date is selected or both start and end dates are selected.
      setDateRange({
        startDate: day.timestamp,
        endDate: null,
      });
    } else {
      // Complete the range by selecting an end date.
      setDateRange({
        startDate: dateRange.startDate,
        endDate: day.timestamp,
      });
      changeFormattedDate(formatDate(dateRange.startDate, day.timestamp));
      setCalendarVisible(false);
    }
  };
   
  return (
      <ScrollView contentContainerStyle={styles.container} > 
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
          <TouchableOpacity  onPress={() => setCalendarVisible(true)}>
            <TextInput 
              style={styles.searchInput}
              onChangeText={changeFormattedDate}
              value={formattedDate}
              placeholder= {formattedDate}
              editable = {false}
              placeholderTextColor="black"
            />
          </TouchableOpacity>
          {isCalendarVisible && (
            <Calendar
              onDayPress={(day) => handleDateSelect(day)}
              // Customize the appearance of the calendar here if needed
            />
          )}     
          <View style={ styles.guestsInputView }>
            <TextInput 
              style={{ fontSize: 18, color: "black"}}
              onChangeText={onChangeAmountGuests}
              value={amountGuests + " Guests"}
              placeholder={amountGuests + " Guests"}
              editable = {false}      
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
          <TouchableOpacity style={styles.button} onPress={filterHotels}>
            <Text style={styles.buttonText}>
              Search
            </Text>   
          </TouchableOpacity>
          <Text>
            {hotelList}
          </Text>
         
        </View>
        <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.mainButtonLeft}>
          <FontAwesome5 name="home" size={24} color="#45cfb2" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButtonRight}>
          <FontAwesome5 name="user" size={24} color="black" />
        </TouchableOpacity>
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
    flex: 1,
    alignItems: "flex-end", // Center the content horizontally
    justifyContent: 'center', // Push the content to the bottom of the screen
    marginBottom: 0, // Adjust the margin as needed
    backgroundColor: theme.backgroundDarkBlue,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row"
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
    color: "black",
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
  mainButtonLeft: {
    marginRight: 70,
    borderWidth: 1,
    padding: 7,
    marginBottom: 40,
    borderRadius: 40,
    backgroundColor: "white"
  },
  mainButtonRight: {

    padding: 7,
    marginBottom: 40,
  }
});
