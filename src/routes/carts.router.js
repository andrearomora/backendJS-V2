import { Router } from "express"
import { getCarts, createCart, getCartById, updateCart, deleteCart, addProductCart, deleteProductCart, purchaseCart} from '../controllers/carts.controller.js'

const router = Router()

router.get('/', getCarts)
router.post('/', createCart)
router.get('/:cid', getCartById)
router.put('/:cid', updateCart)
router.delete('/:cid', deleteCart)
router.put('/:cid/product/:pid', addProductCart)
router.delete('/:cid/product/:pid', deleteProductCart)
router.post('/:cid/purchase', purchaseCart)

export default router