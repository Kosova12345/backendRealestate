import express from 'express'
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from '../controllers/employees.js'


const router = express.Router()

router.get('/find/:userId', getEmployees)
router.get('/', getEmployees)
router.delete('/:id', deleteEmployees)
router.put('/:id', updateEmployees)
router.post("/", createEmployees)

export default router