const router = require('express').Router()
module.exports = router
const fs = require('fs')

const parseName = (name) => {
  let regex = /%20/gi
  return name.replace(regex, ' ')
}

router.get('/',  (req, res, next) => {
  try {
    let highScores = JSON.parse(fs.readFileSync('HighScores.json').toString())
    res.send(highScores)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    let highScores = JSON.parse(fs.readFileSync('HighScores.json').toString())

    for (let i = 0; i < highScores.scores.length; i++) {
        if (req.body.score > highScores.scores[i].score) {
        let newHighScores = []
        newHighScores = [...highScores.scores.slice(0, i), {name: parseName(req.body.name), score: req.body.score}, ...highScores.scores.slice(i, highScores.scores.length - 1)]
        highScores.scores = newHighScores
        fs.writeFileSync('HighScores.json', JSON.stringify(highScores))
        break
    }}
  } catch (err) {
    next(err)
  }
})
