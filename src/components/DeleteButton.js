import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DeleteButton = (props) => {
	// sent to Activity -> Day -> DayList -> AppContainer
	const deleteAct = () => {
		props.deleteActButton()
	}
	
	return (
		<button className="ActivityDeleteButton" onClick={deleteAct}><FontAwesomeIcon icon="times" size="1x" /></button>
	)
}

export default DeleteButton