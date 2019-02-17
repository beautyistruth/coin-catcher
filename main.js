'use strict'

const {db} = require('./server/db')
const app = require('./server')

db.sync({force: true})
  .then(() => {
    app.listen(process.env.PORT || 1337)
  })
