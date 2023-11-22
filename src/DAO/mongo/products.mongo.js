import ProductsModel from "./models/products.mongo.model.js"

export default class Product {
    getProducts = async () => { return await ProductsModel.find().lean().exec() }
    getProductById = async (id) => { return await ProductsModel.findOne({_id: id}) }
    createProduct = async (product) => { return await ProductsModel.create(product) }
    updateProduct = async (id,product) => { return await ProductsModel.findByIdAndUpdate(id, product) }
    deleteProduct = async (id) => { return await ProductsModel.deleteOne({_id: id})
}}