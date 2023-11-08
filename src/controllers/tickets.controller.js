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
    const user = req.body
    const cart = req.body
    const result = await ticketService.saveTicket(user,cart)
    res.send({status: 'success', payload: result})
}

export const updateTicket = async(req,res) => {
    const { tid } = req.params
    const ticket = req.body
    const result = await ticketService.updateTicket(tid, ticket)
    res.send({status: 'success', payload: result})
}