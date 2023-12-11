import {User, Product, Chat, Cart, Ticket} from '../DAO/factory.js'
import UserRepository from './users.repository.js'
import ChatRepository from './chat.repository.js'
import CartRepository from './carts.repository.js'
import TicketRepository from './tickets.repository.js'
import ProductRepository from './products.repository.js'
import MailRepository from './mail.repository.js'


export const userService = new UserRepository(new User())
export const chatService = new ChatRepository(new Chat())
export const cartService = new CartRepository(new Cart())
export const ticketService = new TicketRepository(new Ticket())
export const productService = new ProductRepository(new Product())
export const mailService = new MailRepository()