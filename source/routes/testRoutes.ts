import { Router } from 'express'
import UserController from '../models/user/UserController'
import ErrorHandler from '../middlewares/ErrorHandler'

const testRouter = Router()

testRouter.use('/user', UserController, ErrorHandler)

export default testRouter