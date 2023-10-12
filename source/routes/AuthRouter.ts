import { Router } from 'express'
import PropertyController from '../controllers/auth/PropertyController'
import ErrorHandler from '../middlewares/ErrorHandler'
import Authenticated from '../middlewares/Authenticated'

const AuthRouter = Router()

const Routes = Router()
Routes.use('/property', PropertyController)

AuthRouter.use('/auth', Authenticated, Routes, ErrorHandler)

export default AuthRouter