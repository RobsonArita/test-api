import { Router } from 'express'
import PropertyController from '../controllers/auth/PropertyController'
import ErrorHandler from '../middlewares/ErrorHandler'
import Authenticated from '../middlewares/Authenticated'
import FileController from '../controllers/auth/FileController'

const AuthRouter = Router()

const Routes = Router()
Routes.use('/property', PropertyController)
Routes.use('/file', FileController)

AuthRouter.use('/auth', Authenticated, Routes, ErrorHandler)

export default AuthRouter