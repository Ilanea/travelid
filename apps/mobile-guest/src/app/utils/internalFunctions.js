const { format } = require('date-fns')

//formats the date so it fits the Text Field used
export function formatDate(dateStart, dateEnd) { 
    return(format(new Date(dateStart), "MMMM dd") + " - " + format(new Date(dateEnd), "MMMM dd"))
}

listFilters = ["pets", "parking", "bike rental", "sauna"]
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

export function filterHotels(filters) {
  
}
  