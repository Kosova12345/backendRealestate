import express from 'express'
import { getUser, deleteUser, updateUser } from '../controllers/user.js'

const router = express.Router()

router.get('/find/:userId', getUser)
router.get('/', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

export default router