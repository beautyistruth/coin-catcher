const router = require('express').Router()
module.exports = router
const fs = require('fs')

// router.get('/', async (req, res, next) => {
//   try {
//     const scores = await Score.findAll()
//     res.json(scores)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', (req, res, next) => {
  try {
    let highScores = JSON.parse(fs.readFileSync('HighScores.json').toString())
    for (let i = 0; i < highScores.length; i++) 
      if (req.body.score > highScores[i].score) {
        console.log('higher')
        let newHighScores = []
        newHighScores = [...highScores.slice(0, i), {name: req.body.name, score: req.body.score}, ...highScores.slice(i, highScores.length - 1)]
        console.log(newHighScores)
        fs.writeFileSync(highScores.json, JSON.stringify(newHighScores))
    }
  }} catch (err) {
    next(err)
  }
})

// > fs.readFileSync('HighScores.json')
// <Buffer 7b 0a 20 20 20 22 73 63 6f 72 65 73 22 3a 20 5b 7b 22 6e 61 6d 65 22 3a 20 22 41 6c 69 63 65 22 2c 20 22 73 63 6f 72 65 22 3a 20 31 30 30 30 20 7d 2c ... >
// > let highScoresBuffer = fs.readFileSync('HighScores.json')
// undefined
// > highScoresBuffer.toString()
// '{\n   "scores": [{"name": "Alice", "score": 1000 }, {"name": "Bob", "score": 900 }, {"name": "Carol", "score": 800 }, {"name": "Doug", "score": 700 }, {"name": "Edward", "score": 600 }, {"name": "Francis", "score": 500 }, {"name": "George", "score": 400 }, {"name": "Harry", "score": 300 }, {"name": "Ingrid", "score": 200 }, {"name": "John", "score": 100 }]\n}\n'
// > json.parse(highScoresBuffer.toString())
// ReferenceError: json is not defined
// > JSON.parse(highScoresBuffer.toString())
// { scores:
//    [ { name: 'Alice', score: 1000 },
//      { name: 'Bob', score: 900 },
//      { name: 'Carol', score: 800 },
//      { name: 'Doug', score: 700 },
//      { name: 'Edward', score: 600 },
//      { name: 'Francis', score: 500 },
//      { name: 'George', score: 400 },
//      { name: 'Harry', score: 300 },
//      { name: 'Ingrid', score: 200 },
//      { name: 'John', score: 100 } ] }
// > let parsedHighScores = JSON.parse(highScoresBuffer.toString())
// undefined
// > console.log(prasedHighScores)
// ReferenceError: prasedHighScores is not defined
// > console.log(parsedHighScores)
// { scores:
//    [ { name: 'Alice', score: 1000 },
//      { name: 'Bob', score: 900 },
//      { name: 'Carol', score: 800 },
//      { name: 'Doug', score: 700 },
//      { name: 'Edward', score: 600 },
//      { name: 'Francis', score: 500 },
//      { name: 'George', score: 400 },
//      { name: 'Harry', score: 300 },
//      { name: 'Ingrid', score: 200 },
//      { name: 'John', score: 100 } ] }
// undefined
// > parsedHighScores.
// parsedHighScores.__defineGetter__      parsedHighScores.__defineSetter__
// parsedHighScores.__lookupGetter__      parsedHighScores.__lookupSetter__
// parsedHighScores.__proto__             parsedHighScores.constructor
// parsedHighScores.hasOwnProperty        parsedHighScores.isPrototypeOf
// parsedHighScores.propertyIsEnumerable  parsedHighScores.toLocaleString
// parsedHighScores.toString              parsedHighScores.valueOf

// parsedHighScores.scores

// > parsedHighScores.
// parsedHighScores.__defineGetter__      parsedHighScores.__defineSetter__
// parsedHighScores.__lookupGetter__      parsedHighScores.__lookupSetter__
// parsedHighScores.__proto__             parsedHighScores.constructor
// parsedHighScores.hasOwnProperty        parsedHighScores.isPrototypeOf
// parsedHighScores.propertyIsEnumerable  parsedHighScores.toLocaleString
// parsedHighScores.toString              parsedHighScores.valueOf

// parsedHighScores.scores

// > parsedHighScores.
// parsedHighScores.__defineGetter__      parsedHighScores.__defineSetter__
// parsedHighScores.__lookupGetter__      parsedHighScores.__lookupSetter__
// parsedHighScores.__proto__             parsedHighScores.constructor
// parsedHighScores.hasOwnProperty        parsedHighScores.isPrototypeOf
// parsedHighScores.propertyIsEnumerable  parsedHighScores.toLocaleString
// parsedHighScores.toString              parsedHighScores.valueOf

// parsedHighScores.scores

// > parsedHighScores.scores[0]
// { name: 'Alice', score: 1000 }
// > parsedHighScores.scores[0].name = 'Anna'
// 'Anna'
// > console.log(parsedHighScores)
// { scores:
//    [ { name: 'Anna', score: 1000 },
//      { name: 'Bob', score: 900 },
//      { name: 'Carol', score: 800 },
//      { name: 'Doug', score: 700 },
//      { name: 'Edward', score: 600 },
//      { name: 'Francis', score: 500 },
//      { name: 'George', score: 400 },
//      { name: 'Harry', score: 300 },
//      { name: 'Ingrid', score: 200 },
//      { name: 'John', score: 100 } ] }
// undefined
// > fs.writeFileSync(HighScores.json, JSON.stringify(parsedHighScores))
// ReferenceError: HighScores is not defined
// > fs.writeFileSync('HighScores.json', JSON.stringify(parsedHighScores))
// undefined
// >
