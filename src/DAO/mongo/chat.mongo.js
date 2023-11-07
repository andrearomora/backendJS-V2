import ChatModel from "./models/chat.mongo.model.js"

export default class Chat {
    getChat = async () => { return await ChatModel.find() }
    createChat = async (user,message) => { 
        return await ChatModel.create(user,message)
    }
}