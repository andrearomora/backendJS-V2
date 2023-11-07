import ProductsModel from "./models/products.mongo.model.js"

export default class Product {
    getProducts = async () => { return await ProductsModel.find() }
    getProductById = async (id) => { return await ProductsModel.findOne({_id: id}) }
    createProduct = async (product) => { return await ProductsModel.create(product) }
    updateProduct = async (id,product) => {
        return await ProductsModel.updateProduct({_id:id},{$set: product})
    }
    deleteProduct = async (id) => { return await ProductsModel.deleteOne({_id: id}) }
}