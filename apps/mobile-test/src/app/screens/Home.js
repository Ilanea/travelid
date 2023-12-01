import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useAuth } from '../provider/AuthProvider';
//import { UserService } from '../services/user.service.js';
import { theme } from '../theme/theme.js';
import { getUserData } from '../utils/apiFunctions.js';
import { filterHotels, formatDate } from '../utils/internalFunctions.js';

const { parseISO } = require('date-fns');

//const userService = new UserService();

// Rufe die benötigten Methoden der UserService auf,
// z. B. getUser, editUser, deleteUser, etc
//const user = await userService.getUser(1);

//platzhalter für später, soll user daten simulieren.
const user = getUserData();

const Home = () => {
  const navigation = useNavigation();
  const { authState, onLogout } = useAuth();
  const [authenticated, setAuthenticated] = useState(authState?.authenticated);

  useEffect(() => {
    setAuthenticated(authState?.authenticated);
  }, [authState]);

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      console.log('Logout successful');
    }
  };

  function showFilterView() {
    if (!filterView) {
      return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../pics/aquadome.jpg')}
            style={styles.recommImage}
          />
          <View
            style={{ alignItems: 'left', width: '100%', left: 30, top: -20 }}
          >
            <Text style={{ fontWeight: 'bold' }}>Details</Text>
          </View>
          <Text numberOfLines={4} style={{ width: 350, top: -20 }}>
            Inmitten der atemberaubenden Ötztaler Natur, umringt von der stillen
            Erhabenheit der Berge, schaffen wir eine Atmosphäre, die Wellness
            neu definiert. In unserem 4-Sterne-Superior Hotel AQUA DOME Tirol
            Therme Längenfeld finden Sie zu innerer Ruhe und neuer Kraft. Freuen
            Sie sich auf eine einzigartige Thermen- und Saunawelt und spazieren
            Sie danach durch den futuristisch gestalteten Bademantelgang direkt
            in das Hotel.
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
            top: '10%',
          }}
        >
          <FlatList
            data={listFilters}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3} // Number of buttons in each row
            contentContainerStyle={styles.filterContainer}
          />
        </View>
      );
    }
  }

  const [value, onChangeText] = React.useState('');

  const date = new Date(); //creates new reference to the Date Object to use as End Date by adding a week to today
  date.setDate(date.getDate() + 7);

  const [formattedDate, changeFormattedDate] = React.useState(
    formatDate(new Date(), new Date(date))
  );
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
        selectedFilters.includes(Object.keys(item)[0])
          ? styles.filterButtonSelected
          : {},
      ]}
      onPress={() => handleFilterToggle(Object.keys(item)[0])}
    >
      <Text
        style={
          selectedFilters.includes(Object.keys(item)[0])
            ? styles.filterTextSelected
            : styles.filterText
        }
      >
        {Object.keys(item)[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.backgroundLightBlue}
        />
        <View style={styles.topContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 13,
            }}
          >
            {!filterView ? 'Hello ' + user.firstname : 'Customize Filter'}
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={{ fontSize: 18 }}
              onChangeText={onChangeText}
              value={value}
              placeholder="Location"
              placeholderTextColor="black"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
                paddingRight: 10,
              }}
            >
              <TouchableOpacity
                onPress={
                  !filterView
                    ? () => setFilterView(true)
                    : () => setFilterView(false)
                }
              >
                <Text>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <TextInput
              style={styles.inputView}
              onChangeText={changeFormattedDate}
              value={formattedDate}
              placeholder={formattedDate}
              editable={false}
            />
          </TouchableOpacity>
          {isCalendarVisible && (
            <Calendar
              onDayPress={(day) => handleDateSelect(day)}
              // Customize the appearance of the calendar here if needed
            />
          )}
          <View style={styles.inputView}>
            <TextInput
              style={{ fontSize: 18, color: 'black' }}
              onChangeText={onChangeAmountGuests}
              value={amountGuests + ' Guests'}
              placeholder={amountGuests + ' Guests'}
              editable={false}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => onChangeAmountGuests(amountGuests + 1)}
              >
                <Text style={{ fontSize: 30, paddingRight: 5 }}>+</Text>
              </TouchableOpacity>
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: 'black',
                  height: 30,
                  marginHorizontal: 10,
                }}
              ></View>
              <TouchableOpacity
                onPress={() =>
                  onChangeAmountGuests(
                    amountGuests > 1 ? amountGuests - 1 : amountGuests - 0
                  )
                }
              >
                <Text style={{ fontSize: 30, paddingLeft: 5 }}>─</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Results')}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <Text>{hotelList}</Text>
        </View>
        <View style={styles.bottomContainer}>
          {showFilterView()}
          <View style={styles.mainButtonContainer}>
            <View style={styles.mainButtonLeft}>
              <FontAwesome5 name="home" size={24} color="white" />
            </View>
            <View style={styles.mainButtonSeparator} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={styles.mainButtonMiddle}>
                <FontAwesome5 name="user" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <View style={styles.mainButtonSeparator} />
            <TouchableOpacity
              onPress={() => navigation.navigate('BonuspunktePage')}
            >
              <View style={styles.mainButtonRight}>
                <Text style={{ color: 'white' }}>Points</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
    justifyContent: 'flex-start', // Align items vertically with space-between
    keyboardShouldPersistTaps: 'handled',
  },
  topContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchContainer: {
    padding: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, // Adjust the margin as needed
    backgroundColor: theme.backgroundDarkBlue,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 13,
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    alignItems: 'center',
    color: 'black',
  },
  button: {
    backgroundColor: theme.casualButton,
    marginHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  buttonImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
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
    bottom: 20,
    position: 'absolute',
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
  filterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  filterButton: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    padding: 8,
    minWidth: 50, // Set a minimum width for the buttons
    paddingHorizontal: 20,
    backgroundColor: '#263238',
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
    borderRadius: 20,
    top: -50,
  },
});

export default Home;
