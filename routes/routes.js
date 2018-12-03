const mainController = require('../controllers/mainControl')

module.exports = (app) => {

    app.get('/getAllProducts', mainController.fetchAllProducts)
    app.post('/insertNew', mainController.addProduct)
    app.get('/getProduct/:prodId', mainController.getProduct)
    app.post('/editItem/:prodId', mainController.editItem)
}