export default class ProductDTO {
    constructor(product) {
        this.title = product?.title ?? 'NN'
        this.description = product?.description ?? 'NN'
        this.price = product?.price ?? 'NN'
        this.thumbnail = product?.thumbnail ?? 'NN'
        this.code = product?.code ?? 'NN'
        this.stock = product?.stock ?? []
        this.status = product?.status ?? 'NN'
        this.category = product?.category ?? ''
    }
}
//REVIUSAR CALORES POR DEFECTO