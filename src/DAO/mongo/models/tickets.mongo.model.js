import mongoose from "mongoose"

const TicketsModel = new mongoose.model('tickets', new mongoose.Schema({
    code: { type: String, require: true, unique: true },
    purchase_datetime: { type: Date, require: true },
    amount: Number,
    purchaser: { type: String, require: true },
    state: { type: String, enum: ["pending","completed","cancelled"], default:"pending"}
}))

export default TicketsModel