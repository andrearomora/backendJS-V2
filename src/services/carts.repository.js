import CartDTO from '../DAO/DTO/carts.dto.js'
import { cartService, productService } from '../services/index.js'
import { ticketService } from '../services/index.js'


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
        const productComplete = await productService.getProductById(pid)
        const cartProducts = cart.products
        let exist = false

        await cartProducts.forEach( async product => {
            if( product.product._id.toString() == pid) {
                product.quantity += quantity
                product.price = product.quantity * productComplete.price
                cart.items += quantity
                cart.total += productComplete.price * quantity
                exist = true
            }
        })

        if(exist==false){
            const newProd = {
                title: productComplete.title,
                thumbnail: productComplete.thumbnail,
                product: pid,
                quantity: quantity,
                price: productComplete.price * quantity
            }

            cart.items += quantity
            cart.total += productComplete.price * quantity

            cart.products.push(newProd)
        }

        return await this.dao.updateCart(cid, cart)
    }
    deleteProductCart = async (cid,pid) => { 

        const cart = await this.getCartById(cid)
        const cartProducts = cart.products
        const newCartProducts = cartProducts.filter((item) => item.product._id.toString() !== pid)
        
        if(cart.products =! newCartProducts){
            cart.products = newCartProducts
            await cart.save()
            return await this.dao.updateCart(cid, cart)
        }else{
            return {status: 'fail', payload: cart}
        }
    }

    purchaseCart = async(cid) => {

        const cart = await cartService.getCartById(cid)
        const productsToBuy = []
        const remainingProducts = []
        let itemsToBuy = 0
        let remainingItems = 0
        let totalToBuy = 0
        let remainingTotal = 0
        /*
        *La compra debe corroborar el stock del producto al momento de finalizarse
        Si el producto tiene suficiente stock para la cantidad indicada en el producto
        del carrito, entonces restarlo del stock del producto y continuar
        Si el producto no tiene suficiente stock para la cantidad indicada en el producto
        del carrito, entonces no agregar el producto al proceso de compra. 
        */
       const productsArray = cart.products

       productsArray.forEach(async p => {
            let prod = await productService.getProductById(p.product)

            if (p.quantity <= prod.stock) {
                productsToBuy.push(p)
                prod.stock = prod.stock - p.quantity
                totalToBuy += p.price
                itemsToBuy += p.quantity
                await productService.updateProduct(prod)
            }else{
                remainingProducts.push(p)
                remainingItems += p.quantity
                remainingTotal += p.price
            }
        })

        if(productsToBuy != []){
            cart.products = productsToBuy
            cart.items = itemsToBuy
            cart.total = totalToBuy
            await ticketService.saveTicket(cart)
        }else{
            const result = {
                status: 'Compra fallida',
                cart
            }
            return result
        }

        cart.products = remainingProducts
        cart.items = remainingItems
        cart.total = remainingTotal
        
        const result = {
            description: 'Cracias por tu compra',
            cart: await this.dao.updateCart(cid, cart)
        }
        return result
        
    }

}