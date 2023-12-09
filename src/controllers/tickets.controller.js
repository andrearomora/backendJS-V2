import { ticketService } from "../services/index.js"
import { cartService } from "../services/index.js"

export const getTickets = async(req,res) => {
    const result = await ticketService.getTickets()
    res.send({status: 'success', payload: result})
}

export const getTicketById = async(req,res) => {
    const { tid } = req.params
    const result = await ticketService.getTicketById(tid)
    res.send({status: 'success', payload: result})
}

export const saveTicket = async(req,res) => {
    const cartId = req.params
    const cart = await cartService.getCartById(cartId)
    const result = await ticketService.saveTicket(cart)
    res.send({status: 'success', payload: result})
}