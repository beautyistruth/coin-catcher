import React from 'react'

const HighScores = (props) => {
    const {scoresFromState} = props
    return (
        <div>
        <h2>High Scores</h2>
        <table>
            <tbody>
        {scoresFromState.scores && scoresFromState.scores.map(singleScore => {
            return (<tr key={singleScore.name}>
                <td>{singleScore.name}</td><td /><td>{singleScore.score}</td>
                    </tr>);
        })}
            </tbody>
        </table>
        </div>
    )
  }

export default HighScores
