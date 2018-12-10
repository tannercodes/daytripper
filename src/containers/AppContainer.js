import React, { Component } from 'react'
import DayList from '../components/DayList'
import CreateDayContainer from './CreateDayContainer'
import utils from '../utils/helpers';

class AppContainer extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      days: [],
      id: 1,
      order: 1,
      activityID: 1,
      startDate: '',
      selectedDay: '',
      startDateTitle: 'Select Start Date'
    }

  }

  // used to create unique Day IDs for each new day
  // called when a new Day is created
  incrementID = () => {
    this.setState(prevState => {
      return {id: prevState.id + 1}
    })
  }

  // used to create unique Activity IDs for each new Activity
  // callback received from CreateDayContainer
  // callback received from DayList <- Day
  incrementActivityID = () => {
    this.setState(prevState => {
      return {activityID: prevState.activityID + 1}
    })
  }

  // used to create an order for the Days to be displayed
  // called when a new Day is created
  incrementOrder = () => {
    this.setState(prevState => {
      return {order: prevState.order + 1}
    })
  }

  // used to update order when a Day is deleted
  // called when a Day is deleted
  decrementOrder = () => {
    this.setState(prevState => {
      return {order: prevState.order - 1}
    })
  }

  // when App first mounts it will set Todays date the startDate
  componentDidMount() {
    if (this.state.startDate === '') {
      this.setState({
        startDate: this.todayDate()
      })
    }
  }

  // returns Todays date and converts it to an array
  todayDate = () => {
    const d = new Date()
    const result = utils.convertDateToArray(d)
    return result
  }

  // when a date is selected from DayPicker it sets the selectedDay to this date
  // setDates() is setState callback, when the state is completed being set it will
  // re-order the Days with the updated startDate
  // receives day from CreateDayContainer <- CreateDayBox <- DayPicker
  // day = day that was clicked on in DayPicker
  selectDay = (day) => {
    const newDay = utils.convertDatePickerToObject(day)
    const startDay = utils.convertDateToArray(newDay)
    this.setState({
        selectedDay: day,
        startDate: startDay,
        startDateTitle: startDay
      }, () => {
        this.setDates()
      }
    )
  }

  // iterates through each day and sets it date according to its index within days, 
  // this orders the dates of the Days
  // day = index of Days map is on
  // i = number of index of Day
  setDates = () => {
    const setDays = this.state.days.map( (day, i) => {
      return {...day, date: this.setDayIncrement(i) }
    })
    this.setState(prevState => ({
      ...prevState,
      days: setDays
    }))
  }  

  // increments the day from the startDate
  // converts the date from array to Date obj, increments the date, and converts it
  // back to an array
  // called by setDates() to update the order of the days
  // called by createDay() to set the date for the created Day
  setDayIncrement = (increment) => {
    const start = this.state.startDate

    // create Date obj from startDate state
    let date = utils.convertDateToObject(start)

    // increment Date obj by increment
    date.setDate(date.getDate() + increment)

    // convert date obj back to array
    const result = utils.convertDateToArray(date)

    return result    
  }

  // increments the dayID by 1
  // increments the order by 1
  // determines the total number of days
  // creates newDay obj and sets date depending on total number of days, sets Day attributes
  // received from CreateDayContainer, updates state.days with newDay, then re-orders the Days
  // by date
  // callback received from handleCreateDayButton
  // receives data from CreateDayContainer state
  // data = accommodation, activities, transport
  createDay = (data) => {
    this.incrementID()
    this.incrementOrder()
    const numberOfDays = this.state.days.length

    const newDay = {
      dayID: this.state.id,
      orderID: this.state.order,
      // date = the start date + the number of days
      date: this.setDayIncrement(numberOfDays),
      editActive: false,
      activities: data.activities,
      accommodation: data.accommodation,
      transport: data.transport
    }
    this.setState(prevState => ({
        days: [...prevState.days, newDay]
      }), () => {
        this.setDates()
      }
    )
  }

  // creates newDays from state.days not including the day from which it was clicked
  // updates state.days with new list of Days
  // setState callback followed by: 
  // decrements the order by 1
  // updates the order of all Days
  // received from DayList <- Day <- EditMenu <- DeleteButton
  // id = day props.dayID
  // order = day props.orderID
  deleteDay = (id, orderID) => {
    // the constant is a new array created by the JS filter method with all the elements that aren't
    // the day that was clicked on
    const newDays = this.state.days.filter(days => {
      return days.dayID !== id
    })
    // this is using setState callback function 
    this.setState({ days: newDays }, () => {
      this.decrementOrder()
      this.updateOrderDelete(orderID)
    })
  }  

  // updates Day attributes, then deactivates the EditMenu inputs
  // received from DayList <- Day <- EditMenu
  // id = day props.dayID
  // data = day day.state
  updateDay = (id, data) => {
    // foreach day if it doesn't match the one we're trying
    // to update than just return it as normal, else return
    // the updated match
    const newDays = this.state.days.map(day => {
      if (day.dayID !== id) {
        return day
      }
      else {
        return { 
          ...day, 
          accommodation: data.accommodation,
          transport: data.transport,
          activities: data.activities 
        }
      }
    })
    this.setState(prevState => ({
      ...prevState,
      days: newDays
    }), () => {
      this.deactivateEditDay(id)
    })
  }

  // sends props to EditMenu to display the EditMenu inputs, and display Save button
  // sends showSave(true) prop to DayList -> Day -> EditMenu
  // received from DayList <- Day <- EditMenu
  // data = day props
  activateEditDay = (data) => {
    const newDays = this.state.days.map(day => {
      if (day.dayID !== data.id) {
        return day
      }
      else {
        return {...day, editActive: true}
      }
    })
    this.setState({
      days: newDays
    })
  }

  // sends props to EditMenu to hide the EditMenu inputs, and display the Edit button
  // sends showSave(false) prop to DayList -> Day -> EditMenu
  // received from DayList <- Day <- EditMenu
  // id = day props.dayID
  deactivateEditDay = (id) => {
    const newDays = this.state.days.map(day => {
      if (day.dayID !== id) {
        return day
      }
      else {
        return {...day, editActive: false}
      }
    })
    this.setState({
      days: newDays
    })
  }

  // compares Day dates and sorts them from small to big
  // receives an array 
  // returns the sorted days as an array 
  sortOrderArray = (arr) => {
    // needs to be more than 2 days
    if (this.state.order > 2 ) {
      // compare day a to day b
      function compare(a,b) {
        if (a.orderID < b.orderID)
          return -1;
        if (a.orderID > b.orderID)
          return 1;
        return 0;
      }
      const sorted = arr.sort(compare)
      return sorted
    }
  }

  // updates the day list order when a day is deleted
  // gets all days with index < deleted day
  // gets all days with index > deleted day and decrement orderID by 1
  // concatenate below and above index into result
  // sets new state of days
  // calls setDates
  // called when a day is deleted
  // receives day orderID from deleteDay()
  updateOrderDelete = (orderID) => {

    const tempDays = this.state.days

    // find all days with index < deleted day
    const belowIndex = tempDays.filter(days => {
      return days.orderID < orderID
    })

    // find all days with index > deleted day
    const aboveIndex = tempDays.filter(days => {
      return days.orderID > orderID
    })

    // decrement orderID by 1 for all days > index
    const updatedAbove = aboveIndex.map(day => {
      console.log('order - ')
      return {...day, orderID: day.orderID - 1}
    })

    // combine belowIndex + updatedAbove index
    const result = belowIndex.concat(updatedAbove)

    this.setState(prevState => ({
      ...prevState,
      days: result
    }), () => {
      this.setDates()
    })
  }
  
  // decrements the day oneAbove the index moveUp was called on 
  // received from Daylist <- Day <- EditMenu
  // orderID = day props.orderID
  moveUp = (orderID) => {

    const id = orderID

    // cannot be called on Day 1
    if (id > 1) {

      const tempDays = this.state.days

      // get the day move up was called on
      const index = tempDays.filter(day => {
        if (day.orderID === id && day.orderID > 1) {
          return day
        }      
      })

      // get the day one above index and decrement its orderID
      const oneAbove = tempDays.filter(day => {
        if (day.orderID === id - 1) {
          return day
        }      
      })

      // swap index and oneAbove order
      index[0].orderID = index[0].orderID - 1
      oneAbove[0].orderID = oneAbove[0].orderID + 1

      // all days that are not the index
      const filterDaysIndex = tempDays.filter(day => {
        return day.orderID !== id
      })

      // all days that are not the one above index
      const filterDaysOneAbove = filterDaysIndex.filter(day => {
        return day.orderID !== id - 1
      })    

      // combine all the days with updated index and oneAbove index
      const result = filterDaysOneAbove.concat(index, oneAbove)

      // sort the array so its in order
      const sorted = this.sortOrderArray(result)

      this.setState(prevState => ({
          ...prevState,
          days: sorted
        }), () => {      
          this.setDates()        
      })
    } 
    else {
      console.log('no day above this one')
    }
  }

  // increments the day oneBelow the index moveDown was called on 
  // received from Daylist <- Day <- EditMenu
  // orderID = day props.orderID
  moveDown = (orderID) => {

    const id = orderID
    const order = this.state.order

    // cannot call on the last day
    if ( id + 1 < order ) {

      const tempDays = this.state.days

      // get the day move up was called on
      const index = tempDays.filter(day => {
        if (day.orderID === id && day.orderID + 1 < order) {
          return day
        }      
      })

      // get the day oneBelow index
      const oneBelow = tempDays.filter(day => {
        if (day.orderID === id + 1) {
          return day
        }      
      })      

      // swap index and oneBelow
      index[0].orderID = index[0].orderID + 1
      oneBelow[0].orderID = oneBelow[0].orderID - 1

      // remove index from list
      const filterDaysIndex = tempDays.filter(day => {
        return day.orderID !== id
      })

      // remove oneBelow from list
      const filterDaysOneBelow = filterDaysIndex.filter(day => {
        return day.orderID !== id + 1
      })

      // combine days with updated index and oneBelow
      const result = filterDaysOneBelow.concat(index, oneBelow)

      // sort days
      const sorted = this.sortOrderArray(result)

      this.setState(prevState => ({
          ...prevState,
          days: sorted
        }), () => {
          this.setDates()
      })
    } 

    else {
      console.log('no day below this')
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <CreateDayContainer
          // attribute props
          startDate={this.state.startDate}
          selectedDay={this.state.selectedDay}  
          startDateTitle={this.state.startDateTitle}  
          activityID={this.state.activityID}
          // create day props       
          handleCreateDayButton={this.createDay}
          handleActButton={this.addActivity}
          selectDayButton={this.selectDay}
          incrementActivityID={this.incrementActivityID}      
        />
      	<DayList 
          // attribute props
          days={this.state.days}
          activityID={this.state.activityID}
          // EditMenu props
          incrementActivityID={this.incrementActivityID}          
          activateEditButton={this.activateEditDay}
          moveUpButton={this.moveUp}
          moveDownButton={this.moveDown}
          deleteDayButton={this.deleteDay}
          saveDayButton={this.updateDay}
        />
      </div>
    )
  }
}

export default AppContainer
