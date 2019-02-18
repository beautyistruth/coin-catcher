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
        <h1 className="flex-item">Coin Catcher</h1>
        <p className="flex-item, text" style={{textAlign: 'center-justified'}}>jump from platform to platform collecting falling coins to rack up points. ride clouds and grab rockets. watch out for exploding bombs. add your name to the high scores.
        </p>

        <form className="flex-item, container" style={{marginTop: '50px'}}onSubmit={this.handleSubmit} >
        <p className="flex-item">Enter a nickname to continue.</p>
          <label className="flex-item">
            <input
              className="input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <br />
            <input className="flex-item, button" type="submit" value="Play Game" />
          </label>
        </form>
        <HighScores scoresFromState={this.state.scores} />
      </div>
    )
  }
}

export default StartGame


/*

zoom to planets beyond our solar system to reveal their data and habitability status (sourced from nasa). complete your journey to discover how the planet you know and love, earth, has all you'll ever need – as long as you treat her right.

jump from platform to platform collecting falling coins to rack up points. ride clouds and grab rockets. watch out for exploding bombs. add your name to the high scores
*/
