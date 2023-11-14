import passport from 'passport'
import jwt from 'passport-jwt'
import local from 'passport-local'
import config from './config.js'
import GithubStrategy from 'passport-github2'
import { userService } from '../services/index.js'
import { createHash, extractCookie, isValidPassword } from '../utils.js'

const PRIVATE_KEY = config.jwtPrivateKEY
const LocalStrategy = local.Strategy
//const GithubStrategy = github.Strategy

// const headerExtractor = req => {
//     const token = req.headers['AUTH'] ?? ''

//     console.log('HEADER EXTRACTOR: ', token)
//     return token
// }

const initializePassport = () => {

    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.95aa3e7d85345c73',
            clientSecret: 'dee1a2a092730055b557cf27f661402f67666840',
            callbackURL: 'http://127.0.0.1:8080/session/githubcallback'
        }, 
        async (accesToken, refreshToken, profile, done) => {
            console.log(profile)
            try{
                const email = profile._json.email
                let user = await userService.getByEmail(email)
                if(user){
                    console.log('Loggin in.....  → ' + email)
                }else{
                    console.log('User to register → ' + email)
                    const newUser = {
                        first_name: profile._json.name,
                        email,
                        last_name: profile._json.bio,
                        age: profile._json.public_repos,
                        social: 'github',
                        role: 'user',
                        password: ''
                    }
                    user =  await userService.saveUser(newUser)
                    console.log('user created: ' + user)
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
                console.log('User already exist')
                return done(null, false)
            }
            const newUser = {
                email, 
                first_name, 
                last_name, 
                age,
                password:createHash(password), 
                social: 'local', 
                role}
            const result =  await userService.saveUser(newUser)

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
            console.log('User does not exist')
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
            return done(null, jwt_payload)
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