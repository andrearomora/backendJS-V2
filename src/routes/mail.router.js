import { Router } from "express"
//import { auth, passportJWT } from '../utils.js'
import { sendMail } from '../controllers/mail.controller.js'

const router = Router()

router.get('/', sendMail)

export default router