import CartsModel from "./models/carts.mongo.model.js"
import ProductsModel from "./models/products.mongo.model.js"

export default class Cart {
    getCarts = async () => { return await CartsModel.find() }
    createCart = async (cart) => { return await CartsModel.create(cart) }
    getCartById = async (id) => { return await CartsModel.findOne({_id: id}) }
    updateCart = async (id, cart) => {
        return await CartsModel.updateOne({_id:id},{$set: cart})
    }
    deleteCart = async (id) => { return await CartsModel.deleteOne({_id: id}) }
    addProductCart = async(cid,pid,quantity) => {
        const cart = await CartsModel.findOne({_id: cid})
        const idx = cart.products.findIndex(a => a.id == pid)

        
        if (cart.products[idx]){cart.products[idx].quantity = quantity}
        else{
            let newProduct
            newProduct.productId = pid
            newProduct.quantity = quantity 
            cart.products.push(newProduct)
            }

        return await CartsModel.updateCart(cart)
    }
    deleteProductCart = async (cid,pid) => { 

        const cart = await CartsModel.findOne({_id:cid})
        const cartProducts = cart.products
        const newCartProducts = cartProducts.filter((item) => item._id !== pid)
        cart.products = newCartProducts

        await cart.save()
        return cart
    }
}