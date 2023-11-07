import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT || 8080,
    dbURL: 'mongodb+srv://andrearomora:MacBook2023@ecommerce.py0l9lo.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'ecommerce'

}