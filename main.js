'use strict'

// const {db} = require('./server/db')
const app = require('./server')

app.listen(process.env.PORT || 1337)
// db.sync()
//   .then(() => {
//     app.listen(process.env.PORT || 1337)
//   })
