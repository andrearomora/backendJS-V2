import UsersModel from "./models/users.mongo.model.js"

export default class User {
    getUsers = async () => { return await UsersModel.find().lean().exec() }
    getCensoredUsers = async () => { return await UsersModel.find({}, 'email first_name last_name role').lean().exec() }
    getUserById = async (id) => { return await UsersModel.findOne({_id: id}).lean().exec() }
    getByEmail = async (email) => { return await UsersModel.findOne({email: email}).lean().exec() }
    saveUser = async (user) => { return await UsersModel.create(user) }
    updateUser = async (id, user) => { return await UsersModel.updateOne({_id:id},{$set: user})}
}