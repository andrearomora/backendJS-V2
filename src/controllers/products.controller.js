
const productsService = newProduct()

export const getProducts = async(req,res) => {
    const result = await productsService.getProducts()
    res.send({status: 'success', payload: result})
}

export const createProduct = async(req,res) => {
    const product = req.body
    const result = await productsService.createProduct(product)
    res.send({status: 'success', payload: result})
}

export const getProductById = async(req,res) => {
    const { pid } = req.params
    const result = await productsService.getProductById(pid)
    res.send({status: 'success', payload: result})
}

export const updateProduct = async(req,res) => {
    const { pid } = req.params
    const product = req.body
    const result = await productsService.updateProduct(pid, product)
    res.send({status: 'success', payload: result})
}
export const deleteProduct = async(req,res) => {
    const { pid } = req.params
    const result = await productsService.deleteProduct(pid)
    res.send({status: 'success', payload: result})
}

