import ChatDTO from '../DAO/DTO/chat.dto.js'

export default class ChatRepository {

    constructor(dao) {
        this.dao = dao
    }

    getChat = async () => { return await this.dao.getChat() }
    createChat = async (user,message) => { 
        const chatToInsert = new ChatDTO(user,message)
        return await this.dao.createChat(chatToInsert) 
    }

}