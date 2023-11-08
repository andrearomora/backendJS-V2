import TicketDTO from '../DAO/DTO/tickets.dto.js'

export default class TicketRepository {

    constructor(dao) {
        this.dao = dao
    }

    getTickets = async () => { return await this.dao.getTickets() }
    getTicketById = async (tid) => { return await this.dao.getTicketById(tid) }
    saveTicket = async (user,cart) => { 
        const ticketToInsert = new TicketDTO(user,cart)
        return await this.dao.saveTicket(ticketToInsert) 
    }

}