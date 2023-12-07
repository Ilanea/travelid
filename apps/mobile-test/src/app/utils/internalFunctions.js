const { format } = require('date-fns')

//formats the date so it fits the Text Field used
export function formatDate(dateStart, dateEnd) { 
    return(format(new Date(dateStart), "MMMM dd") + " - " + format(new Date(dateEnd), "MMMM dd"))
}

listFilters = [
  {"pets": false},
  {"parking": false},
  {"bike rental": false},
  {"sauna": false},
  {"fitness": false},
  {"pool": false},
  {"WiFi": false},
  {"reception": false},
  {"beach": false},
  {"contactless": false},
  {"mountains": false},
  {"window": false},
  {"shower": false},
  {"free cancelation": false},
  {"quiet": false},
  {"breakfast": false},  
]
listHotels = [
  {
    "name": "hotelOne",
    "has": "sauna"
  },
  {
    "name": "hotelTwo",
    "has": "parking"
  },
  {
    "name": "hotelThree",
    "has": "bike rental"
  },
  {
    "name": "hotelFour",
    "has": "sauna"
  }]

export function getFilters() {
  return(listFilters)
}
  
export class UserData {
  name = "Fabian";
  contactNum = "+4311111111";
  email = "user@user.at"; 
  bonusPoints = 200;

  addPoints() {
    this.bonusPoints += 100
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return(this.name)
  }

  setEmail() {
    this.email = email
  }

  getEmail() {
    return(this.email)
  }

  setNumber(number) {
    this.contactNum = number
  }
}



