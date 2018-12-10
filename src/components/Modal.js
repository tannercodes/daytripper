import React from 'react'

const Modal = (props) => {
  
  // render null if the "show" prop is false
  if(!props.show) {
    return null
  } 

  return (
    <div className="modal">
      {props.children}
      <div className="footer">
        <button className="modal-close-btn" onClick={props.onClose}>Done</button>
      </div>
    </div>
  )
}

export default Modal