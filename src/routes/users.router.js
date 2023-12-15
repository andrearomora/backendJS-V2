import { Router } from "express"
import { getCensoredUsers, getUserById, changeRole, upload, uploadUserFile, deleteUsers, deleteOneUser, editUser } from "../controllers/users.controller.js"

const router = Router()

router.get('/', getCensoredUsers)
router.get('/:uid', getUserById)
router.post('/premium/:uid', changeRole)
router.post('/edit/:uid', editUser)
router.post('/:uid/documents', upload, uploadUserFile)
router.post('/delete/:uid', deleteOneUser)
router.delete('/', deleteUsers)

export default router