import shortid from 'shortid'

export default class TicketRepository {

    constructor(dao) {
        this.dao = dao
    }
    getTickets = async () => { return await this.dao.getTickets() }
    getTicketByPurchaser = async (email) => { return await this.dao.getTicketByPurchaser(email)}
    getTicketById = async (tid) => { return await this.dao.getTicketById(tid) }
    saveTicket = async (cart) => { 
        
        try {
            const ticketToInsert = {
                code: shortid.generate(),
                purchase_datetime: new Date(),
                amount: cart.total,
                purchaser: cart.owner,
                state: 'completed'
            }
            return await this.dao.saveTicket(ticketToInsert)
            
        } catch (error) {
            return (cart, error)
        }
         
    }
}