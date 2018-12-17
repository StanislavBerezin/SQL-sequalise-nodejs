const Product = require("../models/product");

module.exports = {
    async fetchAllProducts(req, res) {
        try {
            let result = await Product.findAll();
            if (!result) throw "Couldnt search for items";
            console.log(result);
            res.send(result);
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    },

    async addProduct(req, res) {
        try {
            const {
                title,
                price,
                description,
                imageUrl
            } = req.body;

            let newItem = await Product.create({
                title,
                imageUrl,
                description,
                price
            });
            if (!newItem) throw "Something happened";
            console.log("created new item");
            res.send(newItem);
        } catch (e) {
            res.send(e);
        }
    },

    async getProduct(req, res) {
        try {
            const {
                prodId
            } = req.params;
            // FindAll with where is also usable
            // Product.findAll({where: {id: prodId}})
            let found = await Product.findByPk(prodId);
            if (found) {
                res.send(found);
            } else {
                throw "item doesnt exist";
            }
        } catch (err) {
            res.send(err);
        }
    },

    async editItem(req, res) {
        try {
            const {
                title,
                price,
                description,
                imageUrl
            } = req.body;
            const {
                prodId
            } = req.params;

            let updatedProduct = await Product.findByPk(prodId)
                .then(product => {
                    (product.title = title),
                    (product.price = price),
                    (product.imageUrl = imageUrl),
                    (product.description = description);
                    return product.save();
                })
                .catch(e => {
                    throw "Wrong parameteres";
                });

            res.send(updatedProduct);
        } catch (e) {
            res.send(e);
        }
    },

    async deleteItem(req, res) {
        try {
            const {
                prodId
            } = req.params;
            if (!prodId) throw "Wrong delete query";
            Product.findByPk(prodId).then(product => {
                if (!product) throw "No product found"
                return product.destroy()
            })
            // Product.destroy(prodId);
            res.send("item has been deleted")
        } catch (e) {
            res.send("s");
        }
    }
};