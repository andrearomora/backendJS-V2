import { Router } from "express"
import { authToken, passportJWT } from '../utils.js'
import config from "../config/config.js"
import { logger } from "../config/logger.js"
import { cartService, productService, ticketService, mailService } from "../services/index.js"

const router = Router()

router.get('/', async (req, res) => {
    res.render('home', {})
})

router.get('/login', async (req, res) => {
    if(req.cookies[config.keyCookieForJWT]) return res.redirect('/')
    res.render('login', {})
})

router.get('/register', async (req, res) => {
    res.render('register', {})
})

router.get('/cart', passportJWT(), async (req, res) => {
    const cartId = req.user.cart
    const cart = await cartService.getCartById(cartId)
    const products = cart.products

    const result = {
        cartId,
        items: cart.items,
        total: cart.total,
        products: products
    }
    
    res.render('cart', {result})
    
})

router.get('/shop', passportJWT(), async (req, res) => {
    const sort = req.query?.category || "all"
    const products = await productService.getProducts(sort)
    logger.debug(products)
    let result = {}

    if (req.cookies[config.keyCookieForJWT]) {
        result = {
            user: req.user,
            cartId: req.user.cart,
            sort,
            products: await productService.getProducts(sort)
        }
    } else {
        result = {
            sort,
            products: await productService.getProducts(sort)
        }
    }
    res.render('shop', {result})
})

router.get('/product/:pid', passportJWT(), async (req, res) => {

    const id = req.params?.pid    

    const prod = await productService.getProductById(id)
    
    const result = {
        id,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
        title: prod.title,
        description: prod.description,
        price: prod.price,
        cartId: req.user.cart
    }

    if(req.user.role == 'admin' || req.user.email == prod.owner) result.cantEdit = true
    else result.cantEdit = false

    logger.debug(result)
    res.render('productDetail', {result})
})

router.get('/restablecer', async (req, res) => {
    res.render('restablecer', {})
})

router.get('/correo-enviado', async (req, res) => {
    res.render('correo-enviado', {})
})

router.get('/usuario-no-encontrado', async (req, res) => {
    res.render('usuario-no-encontrado', {})
})

router.get('/restablecer/:uid/:tkp', async (req, res) => {
    const result = {
        uid: req.params.uid,
        tkp: req.params.tkp
    }
    res.render('nueva-pass', {result})
})

router.get('/succes-checkout', passportJWT(), async (req, res) => {

    const ticket = await ticketService.getTicketByPurchaser(req.user.email)

    const result = {
        purchaser: req.user.first_name,
        description: 'Gracias por tu compra',
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        state: ticket.state
    }

    const data = {
        email: req.user.email,
        subject: `[SABIA CULTURA ECO] - Compra exitosa`,
        html: `
            <p>Hola ${req.user.first_name},</p>
            <p>Gracias por la compra realizada.</p>
            <br>
            <ul>
                <li><strong>Fecha de la compra: </strong>${ticket.purchase_datetime}</li>
                <li><strong>Valor pagado: </strong>$ ${ticket.amount}</li>
                <li><strong>Estado de la compra: </strong>${ticket.state}</li>
            </ul>
            <p>Tu paquete será enviado el día de mañana a su destino.</p>
            <br>
            <p>Un saludo,</p>
        `
    }

    await mailService.sendMail(data)

    res.render('checkout', {result})

})

router.get('/fail-checkout', passportJWT(), async (req, res) => {

    const result = {
        purchaser: req.user.first_name,
        description: 'Pago fallido',
    }

    res.render('fail-checkout', {result})
    
})

export default router