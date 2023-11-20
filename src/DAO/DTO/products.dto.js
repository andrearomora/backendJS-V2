export default class ProductDTO {
    constructor(product) {
        this.title = product?.title ?? 'NN'
        this.description = product?.description ?? 'NN'
        this.price = product?.price ?? 0
        this.thumbnail = product?.thumbnail ?? 'NN'
        this.code = product?.code ?? 'NN'
        this.stock = product?.stock ?? 0
        this.status = product?.status ?? true
        this.owner = product?.owner ?? 'NN'
        this.category = product?.category ?? ''
    }
}