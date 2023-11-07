import mongoose from 'mongoose'

const CartModel = mongoose.model('carts', new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'products'
        },
        quantity: { type: Number}
    }],
    default: []
}))

export default CartModel 