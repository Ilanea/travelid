const { format } = require('date-fns')

//formats the date so it fits the Text Field used
export function formatDate(dateStart, dateEnd) { 
    return(format(dateStart, "MMMM dd") + " - " + format(dateEnd, "MMMM dd"))
  }
  