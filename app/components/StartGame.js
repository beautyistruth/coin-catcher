/* eslint-disable react/jsx-child-element-spacing */
import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

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
    this.setState({redirect: true})
  }
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to={`./${this.state.value}`} />}
        <h3>Coin Grabber</h3>
        <form onSubmit={this.handleSubmit} >
          <label>
            <input
              className="input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Nickname"
            />
          </label>
          <input type="submit" value="Play Game" />
        </form>
      </div>
    )
  }
}

export default StartGame
