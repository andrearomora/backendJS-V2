import {fileURLToPath} from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'
import config from './config/config.js'
import passport from 'passport'
import bcryptjs from 'bcryptjs'

const PRIVATE_KEY = config.jwtPrivateKEY
const KEY_COOKIE_JWT = config.keyCookieForJWT
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const createHash = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcryptjs.compareSync(password, user.password)
}

export default __dirname

export const generateToken = user => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
}

export const passportJWT = () => {
    return async(req, res, next) => {
        passport.authenticate('jwt', function(err, user, info){
            if(err) return next(err)
            if(!user) {
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

export const auth = (role) => {
    return async(req, res, next) => {
        const user = req.user?.user

        if(!user) return res.status(401).send({error: "Unauthenticated"})
        if(user.role != role) return res.status(403).send({error: 'Unauthorized'})

        return next()
    }
}
// export const authToken = (req, res, next) => {
//     const authHeader = req.headers.auth

//     if(!authHeader){
//         return res.status(401).send({error: 'Not Auth'})
//     }

//     const token = authHeader

//     jwt.verify(token, 'secretForJWT', (error, credentials) => {
//         if(error) return res.status(403).send({error: 'Not authorized'})
//         req.user = credentials.user
//         next()
//     })
// }

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[KEY_COOKIE_JWT] : null
}