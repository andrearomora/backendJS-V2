import { chatService } from "../services/index.js"

export const getChat = async(req,res) => {
    const result = await chatService.getChat()
    res.send({status: 'success', payload: result})
}

export const createChat = async(req,res) => {
    const user = req.body
    const message = req.body
    const result = await chatService.createChat(user,message)
    res.send({status: 'success', payload: result})
}