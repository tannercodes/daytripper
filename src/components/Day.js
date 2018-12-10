import React, { Component } from 'react';
import Activity from './Activity'
import Transport from './Transport'
import Accommodation from './Accommodation'
import EditMenu from './EditMenu'
import utils from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Day extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editHidden: true,
      showSave: false,
      activityID: 1
    }
  }

  // show/hide EditMenu
  showEdit = (view) => {
    this.setState(prevState => ({
      editHidden: !prevState.editHidden
    }))
  }

  // show/hide Edit Menu
  renderEditMenu = () => {
    if ( this.state.editHidden === false ) {
      if ( this.state.showSave === false) {
        return (
          <EditMenu 
            deleteDayButton={this.deleteDay}
            moveUpButton={this.moveUp}
            moveDownButton={this.moveDown}
            activateEditButton={this.activateEditDay}
            saveDayButton={this.saveDay}
            showSave={false}
            showEdit={true}
          />
        )
      } else if ( this.state.showSave === true) {
        return (
          <EditMenu 
            deleteDayButton={this.deleteDay}
            moveUpButton={this.moveUp}
            moveDownButton={this.moveDown}
            activateEditButton={this.activateEditDay}
            saveDayButton={this.saveDay}
            showSave={true}
            showEdit={false}
          />
        )        
      }
    }
  }

  // activates EditDay on (renders input for accommodation,transport,activities)
  // sets state from props sent from AppContainer -> DayList
  // displays Save button in EditMenu
  // hides Edit button in EditMenu
  activateEditDay = () => {
    this.setState({
      accommodation: this.props.accommodation,
      transport: this.props.transport,
      activities: this.props.activities,
      activityContent: '',
      showSave: true
    })
    // sent to DayList -> AppContainer
    this.props.activateEditButton(this.props)
  }

  // onChange for [content] = accommodation or transport or activity inputs
  // updates Day state to content 
  handleChange = (content, e) => {
    const value = e.target.value    
    this.setState({
      [content]: value
    })
  }

  // sent to DayList -> AppContainer
  // received from EditMenu
  // moves the Day up in the list
  moveUp = () => {
    this.props.moveUpButton(this.props.orderID)
  }

  // sent to DayList -> AppContainer
  // received from EditMenu
  // moves the Day up in the list
  moveDown = () => {
    this.props.moveDownButton(this.props.orderID)
  }  

  // sent to DayList -> AppContainer
  // sends dayID so AppContainer knows which to delete
  // sends orderID so AppContainer decrements the Order
  deleteDay = () => {
    this.props.deleteDayButton(this.props.id, this.props.orderID)
  }

  // sent to DayList -> AppContainer
  // sends updated Day attributes to AppContainer from state
  // hides Edit Menu
  // id = props.id
  // data = state
  saveDay = () => {
    this.props.saveDayButton(this.props.id, this.state)
    this.setState({
      editHidden: false,
      showSave: false
    })
  }
  
  // sent to DayList -> AppContainer
  // used to create unique IDs for each Activity
  incrementActivityID = () => {
    this.props.incrementActivityID()
  }

  addActivity = () => {
    // get activityContent 
    const content = this.state.activityContent

    // check to see if activity input is empty
    if (content === '') {
      this.setState({ activityContent: ''})
    } else {

      // increment activity id      
      this.incrementActivityID()
      const newID = this.props.activityID

      // create newActivity obj
      const newActivity = {
        activityContent: content,
        activityID: newID
      }
      // add newActivity obj to existing activities
      // clear activityContent      
      this.setState(prevState => ({
        activities: [...prevState.activities, newActivity],
        activityContent: ''
      }))
    }
  } 

  // deletes Activity from state
  // shows EditMenu on setState callback
  // receives id (activityID) from from Activity component
  deleteActivity = (id) => {
    const newActivities = this.state.activities.filter(acts => {
      return acts.activityID !== id
    })
    this.setState({ 
      activities: newActivities
      },() => {
        this.showEdit(true)
      }
    )
  }

  // displays Date in Day (Name), Month, Day (Number)
  // ie Thursday, June 1
  displayDate = () => {
    return utils.formatDate(this.props.date)   
  }

  renderAccommodation = () => {
    // if editActive is true render Accommodation input
    // if editActive is false just render Accommodation
    if (this.props.editActive === true) {
      return ( 
        <div className="AccommodationItem">
          <input
            type="text"
            className="inputAccommodation"
            id="accommodation"
            value={this.state.accommodation}
            onChange={(e) => this.handleChange('accommodation', e)}
          />        
        </div>   
      )   
    }
    else {
      return (
        <Accommodation
          name={this.props.accommodation}
        />
      )
    }
  }

  renderTransport = () => {
    // if editActive is true render Transport input
    // if editActive is false just render Transport    
    if (this.props.editActive === true) {
      return ( 
        <div className="TransportItem">
          <input
            type="text"
            className="inputTransportation"
            placeholder="Add Transporation"
            id="transport"
            value={this.state.transport}
            onChange={(e)=> this.handleChange('transport', e)}
          />        
        </div>   
      )   
    }
    else {
      return (
        <Transport
          name={this.props.transport}
        />
      )
    }
  }

  renderActivities = () => {
    // if editActive is true render Activities from state
    // elseif editActive is false render Activities from props
    if (this.props.editActive === true) {
      return this.renderActivitiesState()
    }
    else if (this.props.editActive === false) {
      return this.renderActivitiesProps()
    }
  }

  renderActivitiesInput = () => {
    // if editActive is true render Activity input 
    if (this.props.editActive === true) {
      return (
        <div className="day-activity-input">
          <input
            type="text"
            className="inputActivity"
            placeholder="Add Activity"
            id="activity"
            value={this.state.activityContent}
            onChange={(e)=> this.handleChange('activityContent', e)}
          ></input><button className="add-activity" onClick={this.addActivity}>+</button>
        </div>
      )  
    }  
  }

  renderActivitiesState = () => {
    return this.state.activities.map(acts => (
      <Activity
        key={acts.activityID}
        id={acts.activityID}
        content={acts.activityContent}
        deleteActButton={this.deleteActivity}
        displayDelete={true}
      />
    ))
  }

  renderActivitiesProps = () => {
    return this.props.activities.map(acts => (
      <Activity
        key={acts.activityID}
        id={acts.activityID}
        content={acts.activityContent}
        deleteActButton={this.deleteActivity}
        displayDelete={false}
      />
    ))
  }

  render() {
    return (
      <div 
        className="Day"
        onMouseEnter={() => this.showEdit(true)}
        onMouseLeave={() => this.showEdit(false)}
      >
        <div className="DayGrid">

          <div className="day-date-container day-container">
            <div className="day-sidebar-item">
              <h2>Day {this.props.orderID}</h2>
            </div>
            <div className="day-item">
              <div className="day-date-item">{this.displayDate()}</div>
              {this.renderEditMenu()}
            </div>
          </div>
          
          <div className="day-accommodation-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="home" size="2x" /></div>
            </div>
            <div className="day-item">
              {this.renderAccommodation()}
            </div>            
          </div>

          <div className="day-transport-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="car" size="2x" /></div>
            </div>
            <div className="day-item">
              {this.renderTransport()}
            </div>
          </div>

          <div className="day-activity-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="heart" size="2x" /></div>
            </div> 
            <div className="day-item">
              {this.renderActivitiesInput()}
              <div className="ActivityListDay">
                {this.renderActivities()}
              </div>
            </div>
          </div>

        </div>
      </div>   
    )
  }

}

export default Day