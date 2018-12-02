const Product = require('../models/product')

module.exports = {
    async fetchAllProducts(req, res) {
        try {
            let result = await Product.findAll()
            if (!result) throw "Couldnt search for items"
            console.log(result)
            res.send(result)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    },

    async addProduct(req, res) {
        try {
            const {
                title,
                price,
                description,
                imageUrl,
            } = req.body

            let newItem = await Product.create({
                title,
                imageUrl,
                description,
                price
            })
            if (!newItem) throw "Something happened"
            console.log('created new item')
            res.send(newItem)



        } catch (e) {
            res.send(e)
        }

    },

    async getProduct(req, res) {
        try {
            const {
                prodId
            } = req.params
            // FindAll with where is also usable
            // Product.findAll({where: {id: prodId}})
            let found = await Product.findByPk(prodId)
            if (found) {
                res.send(found)
            }

        } catch (err) {
            res.send(err)
        }


    }
}