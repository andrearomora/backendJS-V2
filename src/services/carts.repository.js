import CartDTO from '../DAO/DTO/carts.dto.js'

export default class CartRepository {

    constructor(dao) {
        this.dao = dao
    }

    getCarts = async () => { return await this.dao.getCarts() }
    createCart = async (cart) => {
        const cartToInsert = new CartDTO(cart)
        return await this.dao.createCart(cartToInsert)
    }
    getCartById = async (cid) => { return await this.dao.getCartById(cid)}
    deleteCart = async (cid) => { return await this.dao.deleteOne(cid) }
    addProductCart = async(cid,pid,quantity) => {
        const cart = await this.getCartById(cid)
        const idx = cart.products.findIndex(a => a.id == pid)
        
        if (cart.products[idx]){cart.products[idx].quantity = quantity}
        else{
            let newProduct
            newProduct.productId = pid
            newProduct.quantity = quantity 
            cart.products.push(newProduct)
            }

        return await this.dao.updateCart(cid, cart)
    }
    deleteProductCart = async (cid,pid) => { 

        const cart = await this.getCartById(cid)
        const cartProducts = cart.products
        const newCartProducts = cartProducts.filter((item) => item._id !== pid)
        cart.products = newCartProducts

        await cart.save()
        return await this.dao.updateCart(cid, cart)
    }

    purchaseCart = async(cid) => {
        const result = await cartsService.deleteCart(cid)
        res.send({status: 'success', payload: result})
    }

}