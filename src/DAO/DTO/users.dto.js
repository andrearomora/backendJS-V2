export default class UserDTO {
    constructor(user) {
        this.email = user?.email ?? 'NN'
        this.first_name = user?.first_name ?? 'NN'
        this.last_name = user?.last_name ?? 'NN'
        this.age = user?.age ?? 'NN'
        this.password = user?.password ?? 'NN'
        this.cart = user?.cart ?? []
        this.social = user?.social ?? 'NN'
        this.rol = user?.rol ?? 'user'
    }
}