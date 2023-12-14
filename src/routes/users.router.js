import { Router } from "express"
import {getCensoredUsers, getUserById, changeRole, upload, uploadUserFile} from "../controllers/users.controller.js"

const router = Router()

router.get('/', getCensoredUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)
router.post('/:uid/documents', upload, uploadUserFile)

export default router