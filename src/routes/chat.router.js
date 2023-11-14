import { Router } from "express"
import { getChat, createChat} from '../controllers/products.controller.js'

const router = Router()

router.get('/', getChat)
router.post('/create',  passportJWT(), auth('user'), createChat)

export default router