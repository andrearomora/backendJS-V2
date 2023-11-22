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

router.get('/shop', async (req, res) => {
    
    // const limit = parseInt(req.query?.limit || 10) 
    // const page = parseInt(req.query?.page || 1) 
    // const sort = parseInt(req.query?.sort)
    // const queryParams = req.query?.query || ''
    // const query = {}

    // if (queryParams){
    //     const field = queryParams.split(',')[0]
    //     const value = queryParams.split(',')[1]

    //     if(!isNaN(parseInt(value))) value = parseInt(value)

    //     query[field] = value

    // }
    // //const cartID = await cartModel.findOne({})

    // const result = await getProducts.paginate(query, {
    //     page,
    //     limit,
    //     sort,
    //     lean: true
    // })
    
    // result.prevLink =  result.hasPrevPage ? `/products/?page=${result.prevPage}&limit=${limit}` : ''
    // result.nextLink =  result.hasNextPage ? `/products/?page=${result.nextPage}&limit=${limit}` : ''
    // result.user =  req.session.user
    // result.admin = false
    // if(req.session.user.rol == "admin") result.admin = true
    const products = await productService.getProducts()
    res.render('shop', {products})
    console.log(JSON.stringify(products))

})

export default router