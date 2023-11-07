import FileManager from "./file.manager.js"

export default class Cart extends FileManager {

    constructor(filename= './db.carts.json'){
        ecommerce(filename)
    }

    getCarts = async () => { return await this.get() }
    createCart = async (cart) => { return await this.add(cart) }
    getCartById = async (id) => { return await this.getById(id) }
    updateCart = async (id, cart) => {
        cart.id = id
        return await this.update(cart)
    }
    deleteCart = async (id) => { return await this.delete(id) }
    addProductCart = async(cid,pid) => {
        const cart = await this.getById(cid)
        const idx = cart.products.findIndex(a => a.id == pid)
        
        if (cart.products[idx]){ cart.products[idx].quantity = quantity} 
        else {
            let newProduct
            newProduct.productId = pid
            newProduct.quantity = quantity 
            cart.products.push(newProduct)
        }
        return await this.update(cart)
    }
    deleteProductCart = async (cid,pid) => { 

        const cart = await this.findOne({_id:cid})
        const cartProducts = cart.products
        const newCartProducts = cartProducts.filter((item) => item._id !== pid)
        cart.products = newCartProducts

        await cart.save()
        return cart
    }
}