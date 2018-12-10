const utils = {
  
  // accepts Date obj
  convertDateToArray(obj) {
    const month = obj.getUTCMonth()
    const day = obj.getUTCDate()
    const year = obj.getUTCFullYear()
    const date = [year, month, day]
    return date    
  },

  // accepts Date Array
  convertDateToObject(arr) {
    const date = new Date(arr[0], arr[1], arr[2])
    return date
  },

  // accepts Date Array
  convertDatePickerToObject(daypicker) {
    const date = new Date(daypicker)
    return date
  },  

  // accepts Date Array
  formatDate(arr) {
    const converted = this.convertDateToObject(arr)
    const days = [
      "Sunday","Monday","Tuesday",
      "Wednesday","Thursday","Friday","Saturday"
    ]
    const months = [
      "January", "February", "March", 
      "April", "May", "June", "July", 
      "August", "September", "October", 
      "November", "December"
    ]
    const day = days[converted.getDay()] + ', ' + months[converted.getUTCMonth()] + ' ' + converted.getUTCDate()
    return day       
  }
}

export default utils