import UserDTO from '../DAO/DTO/users.dto.js'

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => { return await this.dao.getUsers() }
    getCensoredUsers = async () => { return await this.dao.getCensoredUsers() }
    getUserById = async (id) => { return await this.dao.getUserById(id) }
    getByEmail = async (email) => { return await this.dao.getByEmail(email) }
    saveUser = async (user) => { 
        const userToInsert = new UserDTO(user)
        return await this.dao.saveUser(userToInsert) 
    }
    updateUser = async (id, user) => {
        return await this.dao.updateUser(id, user) 
    }
    
    
}