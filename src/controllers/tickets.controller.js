import { ticketService } from "../services/index.js"

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
    const user = req.user
    const cartId = req.params
    const result = await ticketService.saveTicket(user,cartId)
    res.send({status: 'success', payload: result})
}

export const updateTicket = async(req,res) => {
    const { tid } = req.params
    const cartId = req.params
    const result = await ticketService.updateTicket(tid, cartId)
    res.send({status: 'success', payload: result})
}