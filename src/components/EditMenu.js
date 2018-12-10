import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditMenu = (props) => {

	// sent to Day -> DayList -> AppContainer
	const deleteDay = () => {
		props.deleteDayButton()
	}

	// sent to Day -> DayList -> AppContainer
	const moveUp = () => {
		props.moveUpButton()
	}

	// sent to Day -> DayList -> AppContainer
	const moveDown = () => {
		props.moveDownButton()
	}

	// sent to Day -> DayList -> AppContainer
	const activateEditDay = () => {
		props.activateEditButton()
	}

	// sent to Day -> DayList -> AppContainer
	const saveDay = () => {
		props.saveDayButton()
	}

	// show/hide Edit or Save button depending on props
	const renderEditSave= () => {
		if (props.showSave === false && props.showEdit === true) {
			return <button className="EditButton" onClick={activateEditDay}>Edit</button>
		} else if (props.showSave === true && props.showEdit === false) {
			return <button className="SaveButton" onClick={saveDay}>Save</button>
		}
	}

	return (
		<div className="EditMenu">
			<button className="DeleteButton" onClick={deleteDay}><FontAwesomeIcon icon="times" size="1x" /></button>
			<button className="UpButton" onClick={moveUp}><FontAwesomeIcon icon="long-arrow-alt-up" size="1x" /></button>
			<button className="DownButton" onClick={moveDown}><FontAwesomeIcon icon="long-arrow-alt-down" size="1x" /></button>
			{renderEditSave()}
		</div>
	)
}

export default EditMenu