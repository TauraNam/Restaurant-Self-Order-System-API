import express from 'express'
import * as controller from '../controllers/ordersController.js'

const router = express.Router()

router.get('/', controller.getOrders)
router.get('/:id', controller.getOrder)
router.post('/', controller.createOrder)
router.put('/:id', controller.updateOrder)
router.delete('/:id', controller.deleteOrder)

// change status
router.post('/:status/:id', controller.changeStatus)

export default router