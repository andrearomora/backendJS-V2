
const ticketsService = newTicket()

export const getTickets = async(req,res) => {
    const result = await ticketsService.getTickets()
    res.send({status: 'success', payload: result})
}

export const getTicketById = async(req,res) => {
    const { tid } = req.params
    const result = await ticketsService.getTicketById(tid)
    res.send({status: 'success', payload: result})
}

export const saveTicket = async(req,res) => {
    const user = req.body
    const cart = req.body
    const result = await ticketsService.saveTicket(user,cart)
    res.send({status: 'success', payload: result})
}

export const updateTicket = async(req,res) => {
    const { tid } = req.params
    const ticket = req.body
    const result = await ticketsService.updateTicket(tid, ticket)
    res.send({status: 'success', payload: result})
}