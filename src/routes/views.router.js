import { Router } from "express"
import { authToken, passportJWT } from '../utils.js'
import config from "../config/config.js"
import { logger } from "../config/logger.js"
import { cartService, productService } from "../services/index.js"

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

export default router