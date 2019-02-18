import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import HighScores from './HighScores'

class StartGame extends React.Component {
  constructor() {
    super()
    this.state = {value: '', redirect: false, scores: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    try {
          const {data} = await axios.get('./api/scores')
          this.setState({scores: data})
    } catch (err) {
      console.error(err)
    }
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
      <div className="container">
        {this.state.redirect && <Redirect to={`./${this.state.value}`} />}
        <h1>Coin Catcher</h1>
        <form onSubmit={this.handleSubmit} >
        <p>Enter a nickname to continue.</p>
          <label>
            <input
              className="input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Play Game" className="button" />
        </form>
        <HighScores scoresFromState={this.state.scores} />
      </div>
    )
  }
}

export default StartGame
