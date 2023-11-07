import FileManager from "./file.manager.js"

export default class Product extends FileManager {

    constructor(filename= './db.products.json'){
        ecommerce(filename)
    }
    getProducts = async () => { return await this.get() }
    getProductById = async (id) => { return await this.getById(id) }
    createProduct = async (product) => { return await this.add(product) }
    updateProduct = async (id,product) => {
        product.id = id
        return await this.update(product)
    }
}
///AJUSTAR MONGO ARCHIVO PARA PRODUCTS