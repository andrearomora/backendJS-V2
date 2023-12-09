import { generateToken, authToken } from "../utils.js"
import { logger } from "../config/logger.js"
import config from "../config/config.js"

const cookieJWT = config.keyCookieForJWT

export const github = (req,res) => {
    (req, res) => {}
}

export const githubCallback = (req, res) => {
    const token = generateToken(req.user)
    req.user.token = token
    logger.debug('Callback: ', req.user)
    res.cookie(cookieJWT, req.user.token).redirect('/')
}
export const register = async(req,res) => {
        return res.redirect('/login')
    }

export const login = async(req,res) => {
        if(!req.user) {
            return res.status(400).json({error: 'Invalid credentials'})
        }

        const token = generateToken(req.user)
        req.user.token = token
        return res.cookie(cookieJWT, req.user.token).redirect('/')
    }

// export const isAuthenticated = (req, res, next) => {
    
//     const token = req.cookies[cookieJWT]
//     logger.debug(token)
//     if (!token) {
//       return res.redirect('/login');
//     }
  
//     return next()
    
//   };


export const privateUser = async (req, res) => {
    res.json({
        user: req.user
    })
}

export const errorUser = async (req, res) => {
    res.json({
        error:true
    })
}

export const current = async (req, res) => {

        const user = {
        _id: req.user._id,
        email:  req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: req.user.role
    }
    res.json(user)
}
