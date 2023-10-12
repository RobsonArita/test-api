import { NextFunction, Request, Response, Router } from 'express'
import SigninService from '../../services/SigninService'
import { UserRepositoryImp } from '../../models/user/UserMongoDB'
import { customResponse } from '../../middleware'

const SigninController = Router()

export const SigninServiceImp = new SigninService(UserRepositoryImp)

SigninController.post('/', async (request: Request, _: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body
    const token = await SigninServiceImp.signin(email, password)
    return customResponse.send_ok('Signin efetuado com sucesso!', { token })
  } catch (err) {
    return next(err)
  }
})

export default SigninController