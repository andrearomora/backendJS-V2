import TicketsModel from "./models/tickets.mongo.model.js"

export default class Ticket {
    getTickets = async () => { return await TicketsModel.find() }
    getTicketById = async (id) => { return await TicketsModel.findOne({_id: id}) }
    getTicketByPurchaser = async(email) => { return await TicketsModel.findOne({purchaser: email}) }
    saveTicket = async (cart) => { return await TicketsModel.create(cart) }
}
