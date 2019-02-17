/* eslint-disable react/jsx-child-element-spacing */
import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import HighScores from './HighScores'

class StartGame extends React.Component {
  constructor() {
    super()
    this.state = {value: '', redirect: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {data} = axios.get('./scores')
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({redirect: true})
  }
  render() {
    return (
      <div className="container">
        {this.state.redirect && <Redirect to={`./${this.state.value}`} />}
        <h1>Coin Grabber</h1>
        <form onSubmit={this.handleSubmit} >
        <p>Enter a nickname to continue.</p>
          <label>
            <input
              className="input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              // placeholder="Nickname"
            />
          </label>
          <input type="submit" value="Play Game" className="button" />
        </form>
        <HighScores />
      </div>
    )
  }
}

export default StartGame
