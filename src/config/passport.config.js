import passport from 'passport'
import jwt from 'passport-jwt'
import local from 'passport-local'
import config from './config.js'
import GithubStrategy from 'passport-github2'
import { userService, cartService } from '../services/index.js'
import { createHash, extractCookie, isValidPassword } from '../utils.js'
import { logger } from './logger.js'

const PRIVATE_KEY = config.jwtPrivateKEY
const LocalStrategy = local.Strategy


const initializePassport = () => {

    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.95aa3e7d85345c73',
            clientSecret: 'dee1a2a092730055b557cf27f661402f67666840',
            callbackURL: 'http://127.0.0.1:8080/session/githubcallback'
        }, 
        async (accesToken, refreshToken, profile, done) => {
            logger.info(JSON.stringify(profile))
            try{
                const email = profile._json.email
                let user = await userService.getByEmail(email)
                if(user){
                    logger.info('Loggin in.....  → ' + email)
                }else{
                    logger.info('User to register → ' + email)
                    const newUser = {
                        first_name: profile._json.name,
                        email,
                        last_name: profile._json.bio,
                        age: profile._json.public_repos,
                        cart: await cartService.createCart(),
                        social: 'github',
                        role: 'user',
                        password: '',
                        tokenPassword: null,
                        expireToken: null
                    }
                    user =  await userService.saveUser(JSON.stringify(newUser))
                    logger.debug('user created: ' + JSON.stringify(user))
                }

                return done(null, user)
                
            }catch(e){ 
                return done('Error to login with GitHub' + e)
            }
        }
    ))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req,username,password,done) => {
        const {email, first_name, age, last_name, role} = req.body
        try {
            const user = await userService.getByEmail(email)
            if(user){
                logger.info('User already exist')
                return done(null, false)
            }
            const newUser = {
                email, 
                first_name, 
                last_name, 
                age,
                password:createHash(password), 
                cart: await cartService.createCart(),
                social: 'local', 
                role,
                tokenPassword: null,
                expireToken: null}
            const result =  await userService.saveUser(newUser)

            const cart = result.cart
            cart.owner = result.email
            cart.save()

            return done(null, result)
        } catch (e) {
            return done('[LOCAL] Error from register user' + e)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        const user = await userService.getByEmail(username)
        if(!user){
            logger.info('User does not exist')
            return done(null, false)
        }

        if(!isValidPassword(user, password)) {
            return done(null, false) 
        }
        return done(null, user)
    }))

    passport.use('jwt', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: PRIVATE_KEY
    }, 
    (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload.user)
        } catch (e) {
            return done(e)
        }
    }))

    passport.serializeUser((user,done) => {
        done(null, user?.id ?? user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id)
        done(null, user)
    })
}

export default initializePassport