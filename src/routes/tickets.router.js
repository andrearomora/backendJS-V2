import { Router } from "express";

const router = Router()

router.get('/', getTickets)
router.get('/:tid', getTicketById)
router.post('/', saveTicket)
router.post('/:tid', updateTicket)

export default router