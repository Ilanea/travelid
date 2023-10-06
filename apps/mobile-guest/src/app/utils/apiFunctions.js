const { format } = require('date-fns')

export function getUserData() {
    return(user = {
        firstname: "Fabian",
        lastname: "Praxmarer",
        age: 23,
    })
}



export function getCurrentDate(dayAdd, monthAdd) {
    const date = new Date(); 
    let dd = date.getDate() + dayAdd 
    date.setMonth(date.getMonth() + monthAdd)
    
    const result = format(date, ("MMMM dd"))
    console.log(result)

    let currentDate = date.toLocaleString(`default`, { month: 'long' }) + " " + `${dd < 10 ? dd = ('0' + dd) : dd}`
    return(currentDate); 
}