import { Router } from "express"
import { getTickets, getTicketById, saveTicket, updateTicket} from '../controllers/tickets.controller.js'


const router = Router()

router.get('/', getTickets)
router.get('/:tid', getTicketById)
router.post('/', saveTicket)
router.post('/:tid', updateTicket)

export default router