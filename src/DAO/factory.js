import config from "../config/config.js"
import mongoose from 'mongoose'

export let User
export let Cart
export let Product
export let Chat
export let Ticket

console.log(`Persistence with ${config.persistence}`);

switch (config.persistence) {
    case 'MONGO':

        mongoose.connect(config.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.dbName
        })
        const {default: UserMongo} = await import('./mongo/users.mongo.js')
        const {default: CartMongo} = await import('./mongo/carts.mongo.js')
        const {default: ProductMongo} = await import('./mongo/products.mongo.js')
        const {default: ChatMongo} = await import('./mongo/chat.mongo.js')
        const {default: TicketMongo} = await import('./mongo/ticket.mongo.js')

        User = UserMongo
        Cart = CartMongo
        Product = ProductMongo
        Chat = ChatMongo
        Ticket = TicketMongo

        break;

    case 'FILE':
       
        const {default: UserFile} = await import('./file/users.file.js')
        const {default: CartFile} = await import('./file/carts.file.js')
        const {default: ProductFile} = await import('./file/products.file.js')
        const {default: ChatFile} = await import('./file/chat.file.js')
        const {default: TicketFile} = await import('./file/ticket.file.js')

        User = UserFile
        Cart = CartFile
        Product = ProductFile
        Chat = ChatFile
        Ticket = TicketFile

        break;
    default:
        break;
}