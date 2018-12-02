const mainController = require('../controllers/mainControl')

module.exports = (app) => {

    app.post('/post', mainController.test)
}