const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sequelize = require('./db/connection')

const Product = require('./models/product')
const User = require('./models/user')

app.use(bodyParser.json())

require('./routes/routes')(app)

app.use((req, res, next) => {
    User.findById(1).then(user => {
        req.user = user
        next()
    }).catch(err => {
        console.log(err)
    })
})


Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
})
User.hasMany(Product)

sequelize.sync({
    force: true
}).then((result) => {
    return User.findByPk(1)

}).then(user => {
    if (!user) {
        User.create({
            name: "Stas",
            email: "test@hotmail.com"
        })
    }
    return Promise.resolve(user);
}).then(user => {
    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}).catch(err => {
    console.log(err)
})