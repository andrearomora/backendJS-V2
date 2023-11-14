import { generateToken } from "../utils.js"
import config from "../config/config.js"

export const github = (req,res) => {
    (req, res) => {}
}

export const githubCallback = (req, res) => {
    const token = generateToken(req.user)
    req.user.token = token
    console.log('Callback: ', req.user)
    res.cookie(config.keyCookieForJWT, req.user.token).redirect('/')
}
export const register = async(req,res) => {
        res.json({status: 'success'})
    }

export const login = async(req,res) => {
        if(!req.user) {
            return res.status(400).json({error: 'Invalid credentials'})
        }

        const token = generateToken(req.user)

        res.json({token})
    }

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
