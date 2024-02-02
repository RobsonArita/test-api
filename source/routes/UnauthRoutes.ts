import { Router } from 'express'
import LoginController from '../controllers/unauth/LoginController'
import ErrorHandler from '../middlewares/ErrorHandler'
import SigninController from '../controllers/unauth/SigninController'
import UnauthPropertyController from '../controllers/unauth/PropertyController'

const UnauthRouter = Router()


const Routes = Router()
Routes.use('/signin', SigninController)
Routes.use('/login', LoginController)
Routes.use('/property', UnauthPropertyController)

UnauthRouter.use('/unauth', Routes, ErrorHandler)

export default UnauthRouter