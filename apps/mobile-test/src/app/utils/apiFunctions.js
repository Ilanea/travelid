const { format } = require('date-fns')
import * as SecureStore from 'expo-secure-store';
import { UserProviderClass } from "../provider/UserProvider"


export function getUserData() {
    return(user = {
        firstname: "Fabian",
        lastname: "Praxmarer",
        age: 23,
    })
}


function getHotels(location, filterArray) //die Suchparameter im homescreen mit dem ich dann die hotels bekomme um im Results screen anzeigen zu lassen
{
    return(/*array an objects */x)
    //name, hotelID, beschreibung
}

function getSingleHotel(hotelID) {
    return(object)
    //name, beschreibung
}

function getPoints(userID) {
    return(points)
}

function addPoints() {
    //query
}


export async function retrieveUserInfo(value) {
    try {
      const userInfoString = await SecureStore.getItemAsync("userInfo");
      
      // Parse the JSON string to get the object
      const userInfoObject = userInfoString ? JSON.parse(userInfoString) : null;
      
      // Access the "id" property
      
      const userId = userInfoObject ? userInfoObject.id : null;
      // Now you can use the 'userId' variable for further processing
      switch(value) {
        case "id":
          return(userInfoObject.id);
        case "bonuspoints":
          return(userInfoObject.bonuspoints);
        case "firstName": 
          return(userInfoObject.firstName);
        case "email": 
          return(userInfoObject.email);
        case "contactNum": 
          return(userInfoObject.mobilePhone)
        case "createdAt": 
          return(userInfoObject.createdAt)
        }
  
  
      // You can also return the value or use it in any other way
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user info:", error);
    }
  }

  export async function changeData(userId, firstName, contactNumber, email) {
    const user = new UserProviderClass()
    user.updateUser(userId, firstName, contactNumber, email)
  }




