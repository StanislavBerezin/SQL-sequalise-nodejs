const db = require('../db/connection')

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl

    }

    save() {
        // ? , ? , ? ,? and array after comma is remove chances of sql injections etc
        try {
            return db.execute(
                "INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)",
                [this.title, this.description, this.imageUrl, this.price])
        } catch (e) {
            console.log(e)
        }
    }
    static deleteById(id) {

    }
    static fetchAll() {
        try {
            return db.execute("SELECT * from products");
        } catch (err) {
            return console.log(`error ${err}`)
        }


    }
    static findById(id) {
        return db.execute('SELECT * from products where products.id = ?', [id])
    }
}