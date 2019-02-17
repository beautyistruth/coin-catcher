const Sequelize = require('sequelize')
const db = require('./database')

const Score = db.define('score', {
  nickname: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Score
