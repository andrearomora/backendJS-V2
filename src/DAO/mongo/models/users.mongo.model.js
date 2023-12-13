import mongoose from "mongoose"

const UsersModel = new mongoose.model('users', new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    age: { type: Number },
    password: { type: String, require: true },
    social: { type: String, require: true },
    role: { type: String, enum: ["admin","user","premium"]},
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'carts'
    },
    tokenPassword: { type: String, default: null },
    expireToken: { type: Date, default: null },
    documents: [
        {
            type: { type: String },
            name: { type: String },
            reference: { type: String }
        }
    ],
    last_connection: { type: Date }
}))

export default UsersModel