import React from 'react'
import Day from './Day'

const DayList = (props) => {

  // sent to AppContainer
  // received from Day
  // data = day.props
  const activateEditDay = (data) => {
    props.activateEditButton(data)
  }

  // sent to AppContainer
  // received from Day <- EditMenu
  const moveUp = (orderID) => {
    props.moveUpButton(orderID)
  }

  // sent to AppContainer
  // received from Day <- EditMenu
  const moveDown = (orderID) => {
    props.moveDownButton(orderID)
  }

  // sent to AppContainer
  // received from Day
  // used to create unique IDs for each Activity
  const incrementActivityID = () => {
    props.incrementActivityID()
  }

  // sent to AppContainer so it knows which day to delete and to decrement order
  // received from Day <- EditMenu
  // id = day props.dayID
  // orderID = day props.orderID
  const deleteDay = (id, orderID) => {
    props.deleteDayButton(id, orderID)
  }

  // sent to AppContainer to update state for that Day
  // received from Day <- EditMenu
  // id = day props.id
  // data = day state
  const saveDay = (id, data) => {
    props.saveDayButton(id, data)
  } 

  const renderDays = () => {

    // iterate through props.days, foreach create a 
    // Day component with the following props
    return props.days.map(days => (
      <Day
        // attribute props
        key={days.orderID}
        id={days.dayID}
        orderID={days.orderID}
        date={days.date}
        accommodation={days.accommodation}
        transport={days.transport}        
        activities={days.activities}
        activityID={props.activityID}

        // EditMenu props
        editActive={days.editActive}
        activateEditButton={activateEditDay}        
        incrementActivityID={incrementActivityID}        
        moveUpButton={moveUp}
        moveDownButton={moveDown}
        deleteDayButton={deleteDay}
        saveDayButton={saveDay}
      />
    ))
  }  

  return (
    <div className="DayList">
      {renderDays()}
    </div>    
  )

}

export default DayList