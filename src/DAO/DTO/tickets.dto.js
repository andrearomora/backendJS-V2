export default class TicketDTO {
    constructor(ticket) {
        this.code = ticket?.code ?? 0
        this.purchase_datetime = ticket?.purchase_datetime ?? 'NN'
        this.amount = ticket?.amount ?? 0
        this.purchaser = ticket?.purchaser ?? 'Use'
        this.state = ticket?.state ?? 'pending'
    }
}