import TicketsModel from "./models/tickets.mongo.model.js"

export default class Ticket {
    getTickets = async () => { return await TicketsModel.find() }
    getTicketById = async (id) => { return await TicketsModel.findOne({_id: id}) }
    saveTicket = async (user,cartId) => { return await TicketsModel.create(user,cartId) }
    updateTicket = async (id,cartId) => {
        return await TicketsModel.updateOne({_id:id},{$set: ticket})
    }
}
