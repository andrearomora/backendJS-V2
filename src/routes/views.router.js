import { Router } from "express"
import { auth, passportJWT } from '../utils.js'

import { productService } from "../services/index.js"

const router = Router()

router.get('/', async (req, res) => {
    res.render('home', {})
})

router.get('/login', async (req, res) => {
    res.render('login', {})
})
router.get('/cart', async (req, res) => {
    res.render('cart', {})
})

router.get('/shop', passportJWT(), async (req, res) => {
    const products = await productService.getProducts()
    res.render('shop', {products})
    console.log(JSON.stringify(products))

})

export default router