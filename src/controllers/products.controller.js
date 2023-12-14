import { productService, userService, mailService } from "../services/index.js"
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
    const product = await productService.getProductById(pid)
    
    const owner = await userService.getByEmail(product.owner)
    if(owner.role==='premium'){
        const data = {
            email: owner.email,
            subject: `[SABIA CULTURA ECO] - Producto eliminado`,
            html: `
                <p>Hola ${owner.first_name},</p>
                <p>Te enviamos este e-mail para informarte que el siguiente producto ha sido eliminado satisfactoriamente.</p>
                <ul>
                    <li><img src=${product.thumbnail} style="height: 80px;"></img></li>
                    <li>${product.title}</li>
                    <li><strong>Código:</strong> ${product.code}</li>
                </ul>
                <br>
                <p>Un saludo,</p>
            `
        }
        await mailService.sendMail(data)
    }
    const result = await productService.deleteProduct(pid)
    res.send({status: 'success', payload: result})
}

