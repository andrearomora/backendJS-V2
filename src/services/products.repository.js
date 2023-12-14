import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {

    constructor(productDAO) {
        this.productDAO = productDAO;
    }

    getProducts = async (categorySort) => { return await this.productDAO.getProducts(categorySort) }
    getProductById = async (tid) => { return await this.productDAO.getProductById(tid) }
    getProductByCode = async(code) => { return await this.productDAO.getProductByCode(code) }
    createProduct = async (product) => { 
        const productExist = await this.productDAO.getProductByCode(product.code);
        if (productExist) {
            res.send("Product already exists")
          }
        const productToInsert = new ProductDTO(product)
        return await this.productDAO.createProduct(productToInsert) 
    }
    updateProduct = async (pid, product) => {
        return await this.productDAO.updateProduct(pid, product)
    }
    deleteProduct = async (pid) => {
        return await this.productDAO.deleteProduct(pid)
    }
}