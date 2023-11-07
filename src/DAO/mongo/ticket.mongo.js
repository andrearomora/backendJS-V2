import TicketsModel from "./models/tickets.mongo.model.js"

export default class Ticket {
    getTickets = async () => { return await TicketsModel.find() }
    getTicketById = async (id) => { return await TicketsModel.findOne({_id: id}) }
    saveTicket = async (user,cart) => { return await TicketsModel.create(user,cart) }
    updateTicket = async (id,ticket) => {
        return await TicketsModel.updateOne({_id:id},{$set: ticket})
    }
}
