const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sequelize = require('./db/connection')

app.use(bodyParser.json())

require('./routes/routes')(app)

sequelize.sync().then((result) => {
    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}).catch(err => {
    console.log(err)
})