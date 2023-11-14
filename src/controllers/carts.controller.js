import { cartService } from "../services/index.js"

export const getCarts = async(req,res) => {
    const result = await cartService.getCarts()
    res.send({status: 'success', payload: result})
}

export const createCart = async(req,res) => {
    const cart = req.body
    const result = await cartService.createCart(cart)
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

    const result = await cartService.addProductCart(cid,pid,quantity)
    res.send({status: 'success', payload: result})
}

export const deleteProductCart = async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params

    const result = await cartService.deleteProductCart(cid,pid)
    res.send({status: 'success', payload: result})
}

export const purchaseCart = async(req,res) => {
    const {cid} = req.params

    const result = await cartService.purchaseCart(cid)
    res.send({status: 'success', payload: result})
}