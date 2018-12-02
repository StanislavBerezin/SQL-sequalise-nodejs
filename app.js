const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db/connection')

app.use(bodyParser.json())

require('./routes/routes')(app)

db.execute("SELECT * FROM products").then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})