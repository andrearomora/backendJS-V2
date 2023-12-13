import { Router } from "express"
import {getUsers, getUserById, changeRole, upload, uploadUserFile} from "../controllers/users.controller.js"

const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)
router.post('/:uid/documents', upload, uploadUserFile)

export default router