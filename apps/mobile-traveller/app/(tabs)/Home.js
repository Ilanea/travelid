import { Pressable, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '../theme/theme.js';
import { getUserData } from '../utils/apiFunctions.js';
import React from 'react'
import { formatDate, filterHotels, getFilters } from '../utils/internalFunctions.js';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
const { parseISO } = require('date-fns')

//platzhalter für später, soll user daten simulieren.
const user = getUserData()

export default function Home() {

  function showFilterView() {
    if(!filterView) {
      return(
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
          <Image
              source={require('../pics/aquadome.jpg')} // Use require to specify the image source
              style={styles.recommImage}
          />
          <Text style={{fontWeight: "bold"}}>
            Details
          </Text>
          <Text numberOfLines={4} style={{ width: 350 }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
          </Text>
        </View>  
      )
    }
    else{
      return(
      <View style={{  justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>            
            <FlatList
              data={listFilters}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={3} // Number of buttons in each row
              contentContainerStyle={styles.filterContainer}
            />
          </View>
      )
    }
  }

  const [value, onChangeText] = React.useState('');

  const date = new Date() //creates new reference to the Date Object to use as End Date by adding a week to today
  date.setDate(date.getDate() + 7)
 
  const [formattedDate, changeFormattedDate] = React.useState(formatDate(new Date, new Date(date))); 
  const [amountGuests, onChangeAmountGuests] = React.useState(2); 
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [hotelList, onChangeHotelList] = useState();
  const [filterView, setFilterView] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const handleFilterToggle = (filter) => {
    const updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(filter)) {
      const index = updatedFilters.indexOf(filter);
      updatedFilters.splice(index, 1);
    } else {
      updatedFilters.push(filter);
    }
    setSelectedFilters(updatedFilters);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilters.includes(Object.keys(item)[0]) ? styles.filterButtonSelected : {},
      ]}
      onPress={() => handleFilterToggle(Object.keys(item)[0])}
    >
      <Text style={selectedFilters.includes(Object.keys(item)[0]) ? styles.filterTextSelected : styles.filterText}>
        {Object.keys(item)[0]}
      </Text>
    </TouchableOpacity>
  );
   
  return (
      <View style={styles.container} > 
        <View style={styles.topContainer}>
          <Link href="tabs/Profile" asChild>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={require('../pics/doggo.jpg')} // Use require to specify the image source
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </Link>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 13, paddingLeft: 40}}>
            {!filterView ? "Hello " + user.firstname : "Customize Filter"}
          </Text> 
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.inputView}>
            <TextInput 
              style={{fontSize: 18}}
              onChangeText={onChangeText}
              value={value}
              placeholder="Location"
              placeholderTextColor="black"
            />
            <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", flex: 1, paddingRight: 10 }}>
              <TouchableOpacity onPress={!filterView ? () => setFilterView(true) : () => setFilterView(false)}>
                <Text>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity  onPress={() => setCalendarVisible(true)}>
            <TextInput 
              style={styles.inputView}
              onChangeText={changeFormattedDate}
              value={formattedDate}
              placeholder= {formattedDate}
              editable = {false}
            />
          </TouchableOpacity>
          {isCalendarVisible && (
            <Calendar
              onDayPress={(day) => handleDateSelect(day)}
              // Customize the appearance of the calendar here if needed
            />
          )}     
          <View style={ styles.inputView }>
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
          {showFilterView() 
          }
          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "flex-end", flex: 1}}>
            <TouchableOpacity style={styles.mainButtonLeft}>
              <FontAwesome5 name="home" size={24} color="#45cfb2" /> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainButtonRight}>
              <FontAwesome5 name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View> 
     
    </View> 
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
    justifyContent: "center",
    marginBottom: 0, // Adjust the margin as needed
    backgroundColor: theme.backgroundDarkBlue,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
   
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: "white",
    marginBottom: 13,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    alignItems: "center",
    color: "black"
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
  },
  filterContainer: {
    padding: 10,
    alignItems: "center",
  },
  filterButton: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    padding: 8,
    minWidth: 50, // Set a minimum width for the buttons
    paddingHorizontal: 20,
    backgroundColor: "#263238",
    
  },
  filterButtonSelected: {
    backgroundColor: '#D68C57', // Customize the selected button's background color
  },
  filterText: {
    color: 'white',
  },
  filterTextSelected: {
    color: 'white', // Customize the selected button's text color
  },
  recommImage: {
    height: 200,
    width: 350,
    borderRadius: 20
  }
});
