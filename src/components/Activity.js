import React from 'react'
import DeleteButton from './DeleteButton'

const Activity = (props) => {

	// sent to Day -> DayList -> AppContainer
	const deleteActivity = () => {
		props.deleteActButton(props.id)
	}

	// displays DeleteButton dependent on deleteActButton prop
	// receives deleteActButton prop from DeleteButton
	// sent to Day -> DayList -> AppContainer
	const displayDelete = () => {
		if (props.displayDelete === true) {
			return (
        <DeleteButton 
          deleteActButton={deleteActivity}
        />
      )
		}
	}

	return (
		<div className="ActivityItem item">
			{props.content}{displayDelete()}
		</div>
	)
}

export default Activity