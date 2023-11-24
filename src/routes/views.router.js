import { Router } from "express"
import { auth, passportJWT } from '../utils.js'

import { productService } from "../services/index.js"

const router = Router()

router.get('/', async (req, res) => {
    res.render('home', {})
})

router.get('/login', async (req, res) => {
    if (req.session?.user) {
        res.redirect('/')
    }
    res.render('login', {})
})
router.get('/cart', async (req, res) => {
    res.render('cart', {})
})

router.get('/shop', async (req, res) => {
    const sort = parseInt(req.query?.sort)
    let result = {}

    if (req.session?.user) {
        result = {
            user: req.session.user,
            sort,
            products: await productService.getProducts()
        }
    } else {
        result = {
            sort,
            products: await productService.getProducts()
        }
    }
    res.render('shop', {result})
})

router.get('/product/:pid', async (req, res) => {

    const id = req.params?.pid
    const prod = await productService.getProductById(id)
    
    const result = {
        thumbnail: prod.thumbnail,
        stock: prod.stock,
        title: prod.title,
        description: prod.description,
        price: prod.price
    }

    result.cantEdit = false

    console.log(result)
    res.render('productDetail', {result})
})

export default router