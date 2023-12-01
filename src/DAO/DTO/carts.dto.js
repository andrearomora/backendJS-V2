export default class CartDTO {
    constructor(cart) {
        this.products = cart?.products ?? []
        this.items = cart?.item || 0
        this.total = cart?.total || 0
        this.owner = cart?.owner
    }
}