import express from 'express'
import * as controller from '../controllers/usersController.js'

const router = express.Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUser)
router.post('/', controller.createUser)
router.post('/login', controller.login)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

export default router