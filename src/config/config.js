import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE || MONGO,
    port: process.env.PORT || 8080,
    dbURL: process.env.MONGO_URL ,
    dbName: process.env.MONGO_DBNAME,
    jwtPrivateKEY: process.env.JWT_PRIVATE_KEY,
    keyCookieForJWT: process.env.KEY_COOKIE_JWT,
    mailGmail: process.env.MAIL_GMAIL,
    passGmail: process.env.PASS_GMAIL,
    node_env: process.env.NODE_ENV || 'development',
    stripeKey: process.env.STRIPE_KEY
}