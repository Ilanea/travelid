import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import { theme } from '../theme/theme.js';

export default function Booking() {
  function rotateArrayForward(arr) {
    if (arr.length < 2) {
      // No need to move if the array has 0 or 1 elements
      return arr;
    }
    const rotatedArray = arr.slice(); // Create a copy of the array
    const firstElement = rotatedArray.shift(); // Remove the first element
    rotatedArray.push(firstElement); // Add the first element to the end
    return rotatedArray;
  }

  function rotateArrayBackward(arr) {
    if (arr.length < 2) {
      // No need to move if the array has 0 or 1 elements
      return arr;
    }
    const rotatedArray = [...arr]; // Create a copy of the array
    const lastElement = rotatedArray.pop(); // Remove the last element
    rotatedArray.unshift(lastElement); // Add the last element to the front
    return rotatedArray;
  }

  const [imageArr, setImageArr] = useState([
    require("../pics/aquadome.jpg"),
    require("../pics/aquadome2.jpg"),
    require("../pics/aquadome3.jpg"),
    require("../pics/aquadome4.jpg"),
    require("../pics/aquadome5.webp"),
    require("../pics/aquadome.jpg"),
    require("../pics/aquadome2.jpg"),
    require("../pics/aquadome3.jpg"),
    require("../pics/aquadome4.jpg"),
    require("../pics/aquadome5.webp"),
  ]);

  function handleMainImage() {
    return <Image source={imageArr[0]} style={styles.mainImage}></Image>;
  }

  function handleSideImage() {
    return [
      <Image key={1} source={imageArr[1]} style={styles.sideImage}></Image>,
      <Image key={2} source={imageArr[2]} style={styles.sideImage}></Image>,
      <Image key={3} source={imageArr[3]} style={styles.sideImage}></Image>,
      <Image key={4} source={imageArr[4]} style={styles.sideImage}></Image>,
    ];
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.backgroundLightBlue}
      />
      <View style={styles.imageContainer}>
        {handleMainImage()}
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => setImageArr(rotateArrayForward(imageArr))} style={styles.arrowLeftButton}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImageArr(rotateArrayBackward(imageArr))} style={styles.arrowRightButton}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sideImageContainer}>{handleSideImage()}</View>
      </View>
      
      <View style={ styles.topContentContainer }>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>
            Aqua Dome
          </Text>
          <Text style={{ marginLeft: "auto" }}>
            ⭐4
          </Text>
        </View>
          <Text style={{ fontSize: 14, marginLeft: 30, marginTop: 15, color: "#7A7289",  }}>
            Innsbruck, Austria
          </Text>
        </View>
        <View style={ styles.bottomContentContainer }>
          <TouchableOpacity style={ styles.detailButton }>
            <Text style={{ color: theme.textWhite }}>
              Details
            </Text>
          </TouchableOpacity>
        
          <View style={{ alignItems: "center",  width: "100%", top: 20, }}>
            <Text numberOfLines={4} style={{ marginLeft: 30,  marginRight: 30 }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            </Text>
            
          </View>
          <Text style={styles.minorHeadline}>
            Facilities
          </Text>
         <View style={ styles.facilityImagesContainer }>
          <View style={{ alignItems: "center", marginRight: 20 }}>
            <Image style={ styles.facilityImage } source={require("../pics/outdoor.jpg")}></Image>
            <Text>Outdoor</Text>
          </View>
          <View style={{ alignItems: "center", marginRight: 20 }}>
            <Image style={ styles.facilityImage } source={require("../pics/wifi.jpg")}></Image>
            <Text>Wifi</Text>
          </View>
          <View style={{ alignItems: "center", marginRight: 20 }}>
            <Image style={ styles.facilityImage } source={require("../pics/bathtub.webp")}></Image>
            <Text>Bathtub</Text>
          </View>
          <View style={{ alignItems: "center", marginRight: 20 }}>
            <Image style={ styles.facilityImage } source={require("../pics/breakfast.jpg")}></Image>
            <Text> Free Breakfast</Text>
          </View>
         </View>
         <View>

         </View>
        </View>
      <View style={styles.bookingButton}>
        <Text style={{ marginLeft: 20, fontSize: 34, fontWeight: 400, color: "white" }}>
          €60
        </Text>
        <Text style={{ color: "white" }}>
          /Night
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto", marginRight: 30, height: "60%", width: "30%", backgroundColor: "#D68C57", justifyContent: "center", alignItems: "center", borderRadius: 30,  }}>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Book Now {"->"}  
          </Text>          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
    width: "100%"
  },
  imageContainer: {
  
  },
  mainImage: {
    height: 350,
    width: '100%',
  },
  sideImageContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    top: 2,
    right: -1,
    backgroundColor: 'white', // Set a background color
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30, 
    overflow: "hidden"
  },
  sideImage: {
    flex: 1,
    height: '100%',
    width: 90,
    marginRight: 2,
    
  },
  arrowContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    top: "45%"
  },
  arrowLeftButton: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    left: 15,
  },
  arrowRightButton: {
    position: 'absolute',    
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    right: 15
  },
  topContentContainer: {
    top: 15,
    marginBottom: 20,
  },
  headlineContainer: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30, // Adjusted padding on the right
    width: "100%",  
    top: 0,
  },
  headline: {
    fontSize: 18,
  },
  bottomContentContainer: {
    
    borderTopWidth: 1,
    borderColor: theme.alternativeColor,
    paddingTop: 10, // Adjust this value as needed
    height: "100%"
  },
  detailButton: {
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#5289B4", 
    height: 27, 
    width: 84,
    left: 30,
    top: 10,
    borderRadius: 30,
  },
  minorHeadline: {
    
    left: 30,
    fontSize: 16,
    fontWeight: "bold",
    top: 40
  },
  facilityImagesContainer: {
    top: "12%",
    height: "20%",
    width: "100%",
    left: 30,
    flexDirection: "row"
  },
  bookingButton: {
    width: "100%",
    height: "10%",
    backgroundColor: "#546A83",
    position: "absolute", 
    bottom: 0,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  facilityImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
    
    
  }
});
