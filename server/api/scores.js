const router = require('express').Router()
module.exports = router
const {Score} = require('../db/index')

router.get('/', (req, res, next) => {
  try {
    res.send('sending from scores/GET')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newScore = await Score.create({score: req.body.score})
    res.json(newScore)
  } catch (err) {
    next(err)
  }
})
