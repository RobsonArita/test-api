import { Router } from 'express'
import LoginController from '../controllers/unauth/LoginController'
import ErrorHandler from '../middlewares/ErrorHandler'
import SigninController from '../controllers/unauth/SigninController'

const UnauthRouter = Router()


const Routes = Router()
Routes.use('/signin', SigninController)
Routes.use('/login', LoginController)

UnauthRouter.use('/unauth', Routes, ErrorHandler)

export default UnauthRouter