import ProductsModel from "./models/products.mongo.model.js"

export default class Product {
    getProducts = async () => { return await ProductsModel.find() }
    getProductById = async (id) => { return await ProductsModel.findOne({_id: id}) }
    createProduct = async (product) => { return await ProductsModel.create(product) }
    updateProduct = async (id,product) => {
        console.log(product);
        return await ProductsModel.updateOne({ _id: id },{
            title: product.title,
            description: product.description,
            price: Number.parseInt(product.price),
            thumbnail: product.thumbnail,
            code: product.code,
            stock: Number.parseInt(product.stock),
            status: product.status,
            category: product.category
        }).lean().exec()
    }
    deleteProduct = async (id) => { return await ProductsModel.deleteOne({_id: id}) }
}