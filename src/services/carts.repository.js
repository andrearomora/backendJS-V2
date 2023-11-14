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
    deleteCart = async (cid) => { return await this.dao.deleteCart(cid) }
    addProductCart = async(cid,pid,quantity) => {
        const cart = await this.getCartById(cid)
        const cartProducts = cart.products
        let exist = false

        await cartProducts.forEach( async product => {
            if( product.product._id.toString() == pid) {
                product.quantity = quantity
                exist = true
            }
        })

        if(exist==false){
            console.log(pid)
            const newProd = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(newProd)
        }

        return await this.dao.updateCart(cid, cart)
    }
    deleteProductCart = async (cid,pid) => { 

        const cart = await this.getCartById(cid)
        const cartProducts = cart.products
        const newCartProducts = cartProducts.filter((item) => item.product._id.toString() !== pid)
        console.log(newCartProducts)
        cart.products = newCartProducts

        await cart.save()
        return await this.dao.updateCart(cid, cart)
    }

    purchaseCart = async(cid) => {
        const result = await this.dao.deleteCart(cid)
        res.send({status: 'success', payload: result})
    }

}