import mongoose from "mongoose"

const UsersModel = new mongoose.model('users', new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'carts'
    },
    social: { type: String, require: true },
    rol: { type: String, enum: ["admin","user","premium"], default:"user"}
}))

export default UsersModel