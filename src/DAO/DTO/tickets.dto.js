export default class TicketDTO {
    constructor(ticket) {
        this.code = ticket?.code
        this.purchase_datetime = ticket?.purchase_datetime
        this.amount = ticket?.amount ?? 0
        this.purchaser = ticket?.purchaser
        this.state = ticket?.state ?? 'pending'
    }
}