import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import StartGame from './StartGame'
import PlayGame from './PlayGame'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={StartGame} />
        <Route exact path="/:nickname" component={PlayGame} />
        <p>Place Game Text Here</p>
      </div>
    </Router>
  )
}

export default App
