import { productService, ticketService, userService } from '../services/index.js'

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
            if(productComplete.owner == cart.owner){
                return {status: 'You are the owner of this product', payload: cart}
            }
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
        const prodToDelete = cartProducts.filter((item) => item.product.toString() === pid)
        const newCartProducts = cartProducts.filter((item) => item.product.toString() !== pid)

        if(cart.products !== newCartProducts){
            cart.products = newCartProducts
            cart.items -= prodToDelete[0].quantity
            cart.total -= prodToDelete[0].price
            return await this.dao.updateCart(cid, cart)
        }else{
            return {status: 'fail', payload: cart}
        }
    }

    purchaseCart = async (cid) => {
        const cart = await this.getCartById(cid)
        const productsToBuy = []
        const remainingProducts = []
        let cartToBuy = {}
        let itemsToBuy = 0
        let remainingItems = 0
        let totalToBuy = 0
        let remainingTotal = 0
        let ticket = {}

        const productsArray = cart.products

        for (const p of productsArray) {
            let prod = await productService.getProductById(p.product)

            if (p.quantity <= prod.stock) {
                productsToBuy.push(p)
                prod.stock -= p.quantity
                totalToBuy += p.price
                itemsToBuy += p.quantity
                await productService.updateProduct(prod._id, prod)
            } else {
                remainingProducts.push(p)
                remainingItems += p.quantity
                remainingTotal += p.price
            }
        }

        if (productsToBuy.length > 0) {
            cartToBuy.owner = cart.owner
            cartToBuy.total = totalToBuy
            ticket = await ticketService.saveTicket(cartToBuy)
        } else {
            const result = {
                status: 'Compra fallida',
                cart
            };
            return result;
        }

        cart.products = remainingProducts
        cart.items = remainingItems
        cart.total = remainingTotal
        await this.dao.updateCart(cid, cart)

        const user = await userService.getByEmail(cart.owner)

        const result = {
            description: 'Gracias por tu compra',
            purchaser: user.first_name,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            state: ticket.state,
            productsToBuy,
        };

        return result
    }
}