const Product = require('../models/product')

module.exports = {
    async fetchAllProducts(req, res) {
        try {
            let result = await Product.fetchAll()
                .then(([row, fieldData]) => {
                    console.log(row)
                })
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

            const product = await new Product(null, title, description, imageUrl, price)
            console.log('before save')
            product.save().then(() => {
                res.send("Product has been saved")
            }).catch((e) => {
                console.log(e)
            })


        } catch (e) {
            res.send(e)
        }

    },

    async getProduct(req, res) {
        try {
            const {
                prodId
            } = req.params

            let found = await Product.findById(prodId)
            if (found) {
                res.send(found[0])
            }

        } catch (err) {
            res.send(err)
        }


    }
}