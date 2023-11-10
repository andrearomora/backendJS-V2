import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {

    constructor(dao) {
        this.dao = dao
    }

    getProducts = async () => { return await this.dao.getProducts() }
    getProductById = async (tid) => { return await this.dao.getProductById(tid) }
    createProduct = async (product) => { 
        const productToInsert = new ProductDTO(product)
        return await this.dao.createProduct(productToInsert) 
    }
    updateProduct = async (pid, product) => {
        let productToUpdate = this.getProductById(pid)
        productToUpdate = product
        return await this.dao.updateProduct(productToUpdate)
    }
}