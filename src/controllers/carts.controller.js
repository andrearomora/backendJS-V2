import { cartService, productService } from "../services/index.js"
import __dirname from "../utils.js"
import config from "../config/config.js"
import Stripe from 'stripe'

const stripe = new Stripe(config.stripeKey)

export const getCarts = async(req,res) => {
    const result = await cartService.getCarts()
    res.send({status: 'success', payload: result})
}

export const createCart = async(req,res) => {

    const result = await cartService.createCart()
    result.owner = "admin"
    result.save()
    
    res.send({status: 'success', payload: result})
}

export const getCartById = async(req,res) => {
    const { cid } = req.params
    const result = await cartService.getCartById(cid)
    res.send({status: 'success', payload: result})
}

export const updateCart = async(req,res) => {
    const cart = req.body
    
    const result = await cartService.updateCart(cart)
    res.send({status: 'success', payload: result})
}

export const deleteCart = async(req,res) => {
    const {cid} = req.params
    const result = await cartService.deleteCart(cid)
    res.send({status: 'success', payload: result})
}

export const addProductCart = async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params
    const quantity = parseInt(req.body.quantity)

    await cartService.addProductCart(cid,pid,quantity)
    return res.redirect(req.body.path)
}

export const deleteProductCart = async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params

    await cartService.deleteProductCart(cid,pid)
    return res.redirect(req.body.path)
}

export const purchaseCart = async(req,res) => {
    const {cid} = req.params
    const productsToPurchase = []
    
    const result = await cartService.purchaseCart(cid)
    const productsToBuy = result.productsToBuy

    if(result.status == 'Compra fallida'){
        res.redirect('http://127.0.0.1:8080/fail-checkout')
        return
    }

    for (const prod of productsToBuy){
        let product = await productService.getProductById(prod.product)
        let p ={
            price_data: {
                product_data: {
                    name: product.title
                },
                currency: 'cop',
                unit_amount: product.price*100,
            },
            quantity: prod.quantity
        }
        productsToPurchase.push(p)
    }
 
    const stripeResult = await stripe.checkout.sessions.create({
        line_items: productsToPurchase,
        mode: 'payment',
        success_url: `http://127.0.0.1:8080/succes-checkout`,
        cancel_url: `http://127.0.0.1:8080/fail-checkout`
    })
    res.redirect(stripeResult.url)
}