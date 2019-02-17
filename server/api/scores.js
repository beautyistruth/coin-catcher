const router = require('express').Router()
module.exports = router
const {Score} = require('../db/index')

router.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll()
    res.json(scores)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await Score.create({nickname: req.body.nickname, score: req.body.score})
  } catch (err) {
    next(err)
  }
})
