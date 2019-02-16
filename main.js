'use strict'

const {db} = require('./server/db')
const app = require('./server')

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(process.env.PORT || 1337)
  })
