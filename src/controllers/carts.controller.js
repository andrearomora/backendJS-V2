
const cartsService = newCart()

export const getCarts = async(req,res) => {
    const result = await cartsService.getCarts()
    res.send({status: 'success', payload: result})
}

export const createCart = async(req,res) => {
    const cart = req.body
    const result = await cartsService.createCart(cart)
    res.send({status: 'success', payload: result})
}

export const getCartById = async(req,res) => {
    const { cid } = req.params
    const result = await cartsService.getCartById(cid)
    res.send({status: 'success', payload: result})
}

export const updateCart = async(req,res) => {
    const cart = req.body
    
    const result = await cartsService.updateCart(cart)
    res.send({status: 'success', payload: result})
}

export const deleteCart = async(req,res) => {
    const cart = req.body
    const result = await cartsService.deleteCart(cart)
    res.send({status: 'success', payload: result})
}

export const addProductCart = async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params
    const quantity = req.body

    const result = await cartsService.addProductCart(cid,pid,quantity)
    res.send({status: 'success', payload: result})
}

export const deleteProductCart = async(req,res) => {
    const {cid} = req.params
    const {pid} = req.params

    const result = await cartsService.deleteProductCart(cid,pid)
    res.send({status: 'success', payload: result})
}

export const purchaseCart = async(req,res) => {
    
}