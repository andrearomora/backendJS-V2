import CartsModel from "./models/carts.mongo.model.js"

export default class Cart {
    getCarts = async () => { return await CartsModel.find() }
    createCart = async (email) => { return await CartsModel.create({}, {$set: {owner:email}}) }
    getCartById = async (id) => { return await CartsModel.findOne({_id: id}) }
    updateCart = async (id, cart) => {
        return await CartsModel.updateOne({_id:id},{$set: cart})
    }
    deleteCart = async (id) => { return await CartsModel.deleteOne({_id: id}) }
}