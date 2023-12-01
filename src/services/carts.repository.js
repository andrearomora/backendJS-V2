import CartDTO from '../DAO/DTO/carts.dto.js'
import productService from './products.repository.js'
import ticketService from './tickets.repository.js'


export default class CartRepository {

    constructor(dao) {
        this.dao = dao
    }

    getCarts = async () => { return await this.dao.getCarts() }
    createCart = async (cart) => {
        return await this.dao.createCart(cart)
    }
    getCartById = async (cid) => { return await this.dao.getCartById(cid)}
    deleteCart = async (cid) => { return await this.dao.deleteCart(cid) }
    addProductCart = async(cid,pid,quantity) => {
        const cart = await this.getCartById(cid)
        const cartProducts = cart.products
        let exist = false

        await cartProducts.forEach( async product => {
            if( product.product._id.toString() == pid) {
                product.quantity += quantity
                cart.items += quantity
                cart.total += product.price * quantity
                exist = true
            }
        })

        if(exist==false){
            console.log(pid)
            const newProd = {
                product: pid,
                quantity: quantity
            }

            const prod = productService.getProductById(pid)
            cart.items += quantity
            cart.total += prod.price * quantity

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

    purchaseCart = async(cid, user) => {

        const cart = await this.getCartById(cid)

        const productsToBuy = []
        const remainingProducts = []
        let total = 0
        /*
        *La compra debe corroborar el stock del producto al momento de finalizarse
        Si el producto tiene suficiente stock para la cantidad indicada en el producto
        del carrito, entonces restarlo del stock del producto y continuar
        Si el producto no tiene suficiente stock para la cantidad indicada en el producto
        del carrito, entonces no agregar el producto al proceso de compra. 
        */
        cart.products.forEach(p => {
            let prod = productService.getProductById(p.product)

            if (p.quantity <= prod.stock) {
                productsToBuy.push(p)
                prod.stock = prod.stock - p.quantity
                total = total + (prod.price * p.quantity)
                productService.updateProduct(prod)
            }else{
                remainingProducts.push(p)
            }
        })

        cart.products = remainingProducts
        await cart.save()

        await ticketService.saveTicket(user, total, productsToBuy)

        const result = await this.dao.updateCart(cid, cart)
        res.send({status: 'success', payload: result})
    }

}