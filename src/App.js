import React, { Component } from 'react'
import './App.css'
import AppContainer from './containers/AppContainer'
import NavBar from './components/NavBar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCar, faHeart, faTimes, faPlusCircle, faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'

library.add(faHome, faCar, faHeart, faTimes, faPlusCircle, faLongArrowAltUp, faLongArrowAltDown)

class App extends Component {
  render() {
    return (
      <div className="App">
      	<NavBar />
        <AppContainer />
      </div>
    );
  }
}

export default App
