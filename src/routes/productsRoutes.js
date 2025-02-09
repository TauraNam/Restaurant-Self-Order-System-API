import express from 'express'
import * as controller from '../controllers/productsController.js'

const router = express.Router()

router.get('/', controller.getProducts)
router.get('/:id', controller.getProduct)
router.post('/', controller.createProduct)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

export default router