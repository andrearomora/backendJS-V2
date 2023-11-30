export default class CartDTO {
    constructor(cart) {
        this.products = cart?.products ?? []
        this.items = cart?.item
        this.total = cart?.total
        this.owner = cart?.owner
    }
}