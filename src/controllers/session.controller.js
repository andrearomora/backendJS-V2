import { generateToken, authToken } from "../utils.js"
import { logger } from "../config/logger.js"
import config from "../config/config.js"
import { userService, mailService } from "../services/index.js"
import { createHash, isValidPassword } from '../utils.js'
import crypto from 'crypto'

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
        res.cookie(cookieJWT, req.user.token).redirect('/')
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

export const resetPasword = async (req, res) => {
    const email = req.query.email
    const user = await userService.getByEmail(email)

    if(!user){
        res.redirect('/usuario-no-encontrado')
        return
    }

    if (user.social == 'github') {
        res.render('/usuario-github')
        return
    }

    user.tokenPassword = crypto.randomBytes(20).toString('hex')
    user.expireToken = Date.now() + 3600000
    await userService.updateUser(user._id,user)

    const data = {
        email,
        subject: `[SABIA CULTURA ECO] - Recuperar contraseña`,
        html: `
            <p>Hola ${user.first_name},</p>
            <p>Te enviamos este e-mail en respuesta a tu solicitud para restablecer la contraseña.</p>
            <p>Para cambiar tu contraseña haz click en el siguiente link. Recuerda que este link es válido por 1 hora:</p>
            <a href="http://${req.headers.host}/restablecer/${user._id}/${user.tokenPassword}">Haz click para cambiar la contraseña</a>
            <br>
            <p>Un saludo,</p>
        `
    }

    const result = await mailService.sendMail(data)

    logger.info("Correo de restablecimiento de contraseña enviado con éxito")
    logger.debug(result)

    res.redirect('/correo-enviado')
    
}

export const newPassword = async (req, res) => {
    const uid = req.params.uid
    const token = req.params.tkp
    const newPass = req.body.password

    const user = await userService.getUserById(uid)
    const now = new Date(Date.now())
    const expireDate = new Date(user.expireToken)

    if(!user){
        res.redirect('/usuario-no-encontrado')
        return
    }

    if (user.tokenPassword === token && expireDate > now) {
        
        if(isValidPassword(user, newPass)){
            res.render('same-pass', {})
            return
        }
        user.tokenPassword = null
        user.expireToken = null
        user.password = createHash(newPass)
        await userService.updateUser(user._id, user)

        res.redirect('/login')
        return
    }
}
