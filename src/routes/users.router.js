import { Router } from "express"
import {getUsers, getUserById, changeRole} from "../controllers/users.controller.js"
//upload
const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)
// router.post('/:uid/documents', upload.())

//https://www.youtube.com/watch?v=wIOpe8S2Mk8

export default router