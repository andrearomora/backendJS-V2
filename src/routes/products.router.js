import { Router } from "express"
import { auth, passportJWT } from '../utils.js'
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct} from '../controllers/products.controller.js'

const router = Router()

router.get('/', getProducts)
router.post('/', passportJWT(), auth('admin'), createProduct)
router.get('/:pid', getProductById)
router.put('/:pid', passportJWT(), auth('admin'), updateProduct)
router.delete('/:pid', passportJWT(), auth('admin'), deleteProduct)

export default router