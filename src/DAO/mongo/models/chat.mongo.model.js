import mongoose from 'mongoose'

const chatCollection = 'chat'

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
})

mongoose.set('strictQuery', false)

const chatModel = mongoose.model(chatCollection, chatSchema)

export default chatModel 