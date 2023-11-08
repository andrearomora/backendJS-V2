import FileManager from "./file.manager.js"

export default class Ticket extends FileManager {

    constructor(filename= './db.tickets.json'){
        super(filename)
    }

    getTickets = async () => { return await this.get() }
    getTicketById = async (id) => { return await this.getById(id) }
    saveTicket = async (user,cart) => { return await this.add(user,cart) }
    updateTicket = async (id,ticket) => {
        ticket.id = id
        return await this.update(ticket)
    }
}
