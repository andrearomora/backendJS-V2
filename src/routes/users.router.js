import { Router } from "express";

const router = Router()

router.get('/', getUsers)
router.get('/:uid', getUserById)
router.post('/', saveUser)

export default router