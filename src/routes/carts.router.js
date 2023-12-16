import { Router } from "express"
import { getCarts, createCart, getCartById, updateCart, deleteCart, addProductCart, deleteProductCart, purchaseCart} from '../controllers/carts.controller.js'
import { auth, passportJWT } from '../utils.js'


const router = Router()

router.get('/', getCarts)
router.post('/', createCart)
router.get('/:cid', getCartById)
router.put('/:cid', updateCart)
router.delete('/:cid', deleteCart)
router.post('/:cid/product/:pid',  passportJWT(), auth('user' || 'premium'), addProductCart)
router.post('/:cid/productd/:pid',  passportJWT(), auth('user' || 'premium'), deleteProductCart)
router.post('/:cid/purchase',  passportJWT(), auth('user' || 'premium'), purchaseCart)

export default router