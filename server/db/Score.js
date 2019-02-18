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

// Score.findHighest = function () {
//   return this.findAll({
//     where: {
//       age: {$lte: 1}
//     }
//   })
// }

module.exports = Score
