import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Activity from './Activity'
import Modal from './Modal'
import utils from '../utils/helpers'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'


const CreateDayBox = (props) => {

  // sets initial startDate title 
  // updates startDate when changed
  const displayStartDateTitle = () => {
  	if (props.startDateTitle === 'Select Start Date') {
  		return props.startDateTitle
  	} else {
  		return utils.formatDate(props.startDateTitle)
  	}
  }

  // open/close DayPicker modal
  // received from CreateDayContainer
  const toggleModal = () => {
    props.toggleModal()
  }

  // datepicker select day
  // sent to CreateDayContainer -> AppContainer
  // received from DayPicker
  // day = day that was clicked in DayPicker component
	const handleDayClick = (day) => {
		props.selectDayButton(day)
	}

  // onChange for accommodation, transport, activity inputs
  // sent to CreateDayContainer
  // type = accommodation, transport, or activity
  // e = event value of input for type
  const handleChange = (type, e) => {
  	const content = type
  	const event = e.target.value
  	props.handleChangeButton(content, event)
  }

  const addExample = () => {
  	props.addExampleButton()
  }

  const addActivity = () => {
  	props.addActivityButton()
  }

  const deleteActivity = (name) => {
  	props.deleteActButton(name)
  }

	const handleCreateDay = (name) => {
		props.handleCreateDayButton(name)
	}

  const renderActivities = () => {
    return props.activities.map(acts => (
      <Activity
        key={acts.activityID}
        id={acts.activityID}
        content={acts.activityContent}
        deleteActButton={deleteActivity}
        displayDelete={true}
      />
    ))
  }

	return (
		<div className="CreateDayBox">

			<div className="CreateDayMenu">
				<h2>Create Day</h2>
				<button onClick={addExample}>Add Example</button>
				<button onClick={handleCreateDay}>Create Day</button>
			</div>

	    <div className="Day">
	      <div className="DayGrid">

          <div className="day-date-container day-container">
            <div className="day-sidebar-item">
              <h2>Start Day</h2>
            </div>
            <div className="day-item">
			        <button className="calendarBtn" onClick={toggleModal} >{displayStartDateTitle()}</button>
							<Modal 
								show={props.showModal} 
								onClose={toggleModal}
							>
					  		<DayPicker 
					  			onDayClick={handleDayClick}
					  			selectedDays={props.selectedDay}
					  		/>		
					  	</Modal>              
            </div>
          </div>

          <div className="day-accommodation-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="home" size="2x" /></div>
            </div>
            <div className="day-item">
							<input
								type="text"
								className="inputAccommodation"
								placeholder="Add Accommodation"
								id="accommodation"
								value={props.accommodation}
								onChange={(e) => handleChange('accommodation', e)}
							/>              
            </div>            
          </div>
        
          <div className="day-transport-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="car" size="2x" /></div>
            </div>
            <div className="day-item">
							<input
								type="text"
								className="inputTransportation"
								placeholder="Add Transporation"
								id="transport"
								value={props.transport}
								onChange={(e)=> handleChange('transport', e)}
							/>
            </div>
          </div>

          <div className="day-activity-container day-container">
            <div className="day-sidebar-item">
              <div className="day-svg"><FontAwesomeIcon icon="heart" size="2x" /></div>
            </div> 
            <div className="day-item">
              <div className="day-input">
                <input
                  type="text"
                  className="inputActivity"
                  placeholder="Add Activity"
                  id="activity"
                  value={props.activityContent}
                  onChange={(e)=> handleChange('activityContent', e)}
                /><button className="add-activity" onClick={addActivity}><FontAwesomeIcon icon="plus-circle" size="1x" /></button>
              </div>
              <div className="ActivityListDay">
                {renderActivities()}
              </div>
            </div>
          </div>

	      </div>
	  	</div>
		</div>		
	)
}

export default CreateDayBox


          




