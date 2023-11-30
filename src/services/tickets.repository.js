import TicketDTO from '../DAO/DTO/tickets.dto.js'

export default class TicketRepository {

    constructor(dao) {
        this.dao = dao
    }

    newCode = async () => {
        const tickets = this.dao.getTickets()
        return tickets[tickets.length++].code++
    }
    getTickets = async () => { return await this.dao.getTickets() }
    getTicketById = async (tid) => { return await this.dao.getTicketById(tid) }
    saveTicket = async (user,total, productsToBuy) => { 

        try {
            const ticketToInsert = {
                code: await this.newCode(),
                purchase_datetime: new Date(),
                amount: total,
                purchaser: user.email,
                state: 'completed'
            }
            
            new TicketDTO(ticketToInsert)
            return ticketToInsert
            
        } catch (error) {
            return (productsToBuy, error)
        }
         
    }

    updateTicket = async() => {

    }

}