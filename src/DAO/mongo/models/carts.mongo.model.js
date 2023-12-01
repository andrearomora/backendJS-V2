import mongoose from 'mongoose'

const CartModel = mongoose.model('carts', new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'products'
        },
        quantity: { type: Number}
    }],
    default: [],
    items: {type: Number, default: 0},
    total: {type: Number, default: 0},
    owner: {type: String},
}))

export default CartModel 