import { Router } from "express"
import { auth, passportJWT } from '../utils.js'
import {getUsers, getUserById, changeRole} from "../controllers/users.controller.js"
   
const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)

export default router