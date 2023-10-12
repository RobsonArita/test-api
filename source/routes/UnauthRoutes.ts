import { Router } from 'express'
import LoginController from '../controllers/unauth/LoginController'
import ErrorHandler from '../middlewares/ErrorHandler'
import SigninController from '../controllers/unauth/SigninController'

const UnauthRouter = Router()

const LoginRouter = Router()
LoginRouter.use('/login', LoginController)

const SigninRouter = Router()
SigninRouter.use('/signin', SigninController)

UnauthRouter.use('/unauth', LoginRouter, ErrorHandler)
UnauthRouter.use('/unauth', SigninRouter, ErrorHandler)

export default UnauthRouter