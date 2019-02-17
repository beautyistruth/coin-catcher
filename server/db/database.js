'use strict'

const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const db = new Sequelize(`postgres://localhost:5432/coin-catcher`, {
  logging: false
})

module.exports = db
