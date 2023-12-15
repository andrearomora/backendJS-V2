import { Router } from "express"
import { getCensoredUsers, getUserById, changeRole, upload, uploadUserFile, deleteUsers, deleteOneUser } from "../controllers/users.controller.js"

const router = Router()

router.get('/', getCensoredUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)
router.post('/:uid/documents', upload, uploadUserFile)
router.delete('/:uid', deleteOneUser)
router.delete('/', deleteUsers)

export default router