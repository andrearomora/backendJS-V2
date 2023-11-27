import FileManager from "./file.manager.js"

export default class Product extends FileManager {

    constructor(filename= './db.products.json'){
        super(filename)
    }
    getProducts = async (categorySort) => { 
        if (categorySort == "all") {
            return await this.get()
        } else {
            return await this.get({category: categorySort})
        }
    }
    getProductById = async (id) => { return await this.getById(id) }
    createProduct = async (product) => { return await this.add(product) }
    updateProduct = async (id,product) => {
        product.id = id
        return await this.update(product)
    }
    deleteProduct = async (id) => {return await this.delete(id)}
}
