import { NextFunction, Request, Response, Router } from 'express'
import SigninService from '../../services/SigninService'
import { UserRepositoryImp } from '../../models/user/UserMongoDB'
import { customResponse } from '../../middleware'
import LoginValidator from '../../validators/LoginValidator'

const SigninController = Router()
const validator = new LoginValidator()

export const SigninServiceImp = new SigninService(UserRepositoryImp)

SigninController.post('/', async (request: Request, _: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body
    
    validator.validate(
      { email },
      { password }
    )

    const signinResponse = await SigninServiceImp.signin(email, password)
    return customResponse.send_ok('Signin efetuado com sucesso!', { signinResponse })
  } catch (err) {
    return next(err)
  }
})

export default SigninController