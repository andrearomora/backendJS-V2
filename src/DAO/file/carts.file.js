import FileManager from "./file.manager.js"

export default class Cart extends FileManager {

    constructor(filename= './db.carts.json'){
        super(filename)
    }

    getCarts = async () => { return await this.get() }
    createCart = async (cart) => { return await this.add(cart) }
    getCartById = async (id) => { return await this.getById(id) }
    updateCart = async (id, cart) => {
        cart.id = id
        return await this.update(cart)
    }
    deleteCart = async (id) => { return await this.delete(id) }
}