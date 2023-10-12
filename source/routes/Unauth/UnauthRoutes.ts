import { Router } from 'express'
import LoginController from '../../controllers/unauth/LoginController'
import ErrorHandler from '../../middlewares/ErrorHandler'

const UnauthRouter = Router()
const LoginRouter = Router()
LoginRouter.use('/login', LoginController)

UnauthRouter.use('/unauth', LoginRouter, ErrorHandler)

export default UnauthRouter