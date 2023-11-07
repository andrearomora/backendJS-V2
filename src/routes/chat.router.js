import { Router } from "express";

const router = Router()

router.get('/', getChat)
router.post('/create', createChat)

export default router