import { Router } from "express"
import {getUsers, getUserById} from "../controllers/users.controller.js"
   
const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)

export default router