import FileManager from "./file.manager.js"

export default class Chat extends FileManager {

    constructor(filename= './db.chat.json'){
        super(filename)
    }
    getChat = async () => { return await this.get() }
    createChat = async (user,message) => { 
        let data
        data.user = user
        data.message = message
        return await this.add(data)
    }
}