import express from 'express'
import * as controller from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/', controller.getCategories)
router.get('/:id', controller.getCategory)
router.post('/', controller.createCategory)
router.put('/:id', controller.updateCategory)
router.delete('/:id', controller.deleteCategory)

export default router