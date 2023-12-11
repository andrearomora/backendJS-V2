import { productService } from "../services/index.js"
import { logger } from '../config/logger.js'

export const getProducts = async(req,res) => {
    const categorySort = req.params.category || "all"
    const result = await productService.getProducts(categorySort)
    res.send({status: 'success', payload: result})
}

export const createProduct = async(req,res) => {
    const product = req.body
    const result = await productService.createProduct(product)
    res.send({status: 'success', payload: result})
}

export const getProductById = async(req,res) => {
    const { pid } = req.params
    const result = await productService.getProductById(pid)
    res.send({status: 'success', payload: result})
}

export const updateProduct = async(req,res) => {
    const { pid } = req.params
    const product = req.body

    const result = await productService.updateProduct(pid, product)
    res.send({status: 'success', payload: result})
}
export const deleteProduct = async(req,res) => {
    const { pid } = req.params
    const result = await productService.deleteProduct(pid)
    res.send({status: 'success', payload: result})
}

