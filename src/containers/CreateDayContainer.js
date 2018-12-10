import React, { Component } from 'react'
import CreateDayBox from '../components/CreateDayBox'

class CreateDayContainer extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
    	dayID: '',
    	orderID: '',
    	date: '',
    	activities: [],
    	activityContent: '',
    	accommodation: [],
    	transport: [],
    	calendarOpen: false
    }
 
  }

  // open/close DayPicker modal
	toggleModal = () => {
    this.setState(prevState => ({
      calendarOpen: !prevState.calendarOpen
    }))
	}

  // datepicker selects day when clicked
  // sent to AppContainer
  // received from CreateDayBox <- DayPicker
  // day = day that was clicked on in DayPicker
	selectDay = (day) => {
		this.props.selectDayButton(day)
	}

  // onChange for accommodation, transport, activity inputs
  handleChange = (content, event) => {
  	this.setState({ [content]: event })
  }

	clearState = () => {
		this.setState({
			dayID: '',
			orderID: '',
    	activityContent: '',
    	activities: [],
    	accommodation: [],
    	transport: []
		})
	} 

	addExample = () => {
		// get random number between 0-3
		const random = Math.floor(Math.random() * 3);
		// increment activity id
		this.incrementActivityID()
		const actID = this.props.activityID

		// create empty object for switch statement
		let example = {}

		// return random example between 0-3
		switch (random) {
			case 0:
				example = {
					activities: [{ activityID: actID,
												 activityContent: 'Rafting'
											}],
					accommodation: [ 'Backyard Inn' ],
					transport: [ 'Drive to Rotorua' ]			
				};
				break;
			case 1:
				example = {
					activities: [{ activityID: actID,
												 activityContent: 'Bungy Jumping'
											}],
					accommodation: [ 'Pinewood Lodge' ],
					transport: [ 'Drive to Queenstown' ]		
				};
				break;
			case 2:
				example = {
					activities: [{ activityID: actID,
												 activityContent: 'Surfing'
											}],
					accommodation: [ 'YHA Kaikoura' ],
					transport: [ 'Drive to Kaikoura' ]			
				};								
		}
		// set new state
		this.setState(prevState => ({
			...prevState,
			activities: example.activities,
			accommodation: example.accommodation,
			transport: example.transport
		}))
	}

	// sent to AppContainer
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

	deleteActivity = (id) => {
		const newActivities = this.state.activities.filter(act => {
			return act.activityID !== id
		})
		this.setState({
			activities: newActivities
		})
	}

	// send state to AppContainer to create day
	// clear the state 
	handleCreateDay = () => {
		this.props.handleCreateDayButton(this.state)
		this.clearState()
	}	

	render() {
		return (
			<div className="CreateDayContainer">
				<CreateDayBox
					// input props
					handleChangeButton={this.handleChange}
					addExampleButton={this.addExample}
					addActivityButton={this.addActivity}
					deleteActButton={this.deleteActivity}
					handleCreateDayButton={this.handleCreateDay}
					// datepicker props
					selectDayButton={this.selectDay}
					selectedDay={this.props.selectedDay}
					startDate={this.props.startDate}
					startDateButton={this.addStartDay}
					startDateTitle={this.props.startDateTitle}
					showModal={this.state.calendarOpen}
					toggleModal={this.toggleModal}					
					// day props
					id={this.state.dayID}
					activities={this.state.activities}
					activityContent={this.state.activityContent}
					accommodation={this.state.accommodation}
					transport={this.state.transport}
				/>	
			</div>
		)
	}
}

export default CreateDayContainer