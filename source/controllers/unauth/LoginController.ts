import { NextFunction, Request, Response, Router } from 'express'
import LoginService from '../../services/LoginService'
import { UserRepositoryImp } from '../../models/user/UserMongoDB'
import { customResponse } from '../../middleware'
import LoginValidator from '../../validators/LoginValidator'

const LoginController = Router()
const validator = new LoginValidator()

export const LoginServiceImp = new LoginService(UserRepositoryImp)

LoginController.post('/register', async (request: Request, _: Response, next: NextFunction) => {
  try {
    const { name, email, cellphone, level, password } = request.body

    validator.validate(
      { name },
      { email },
      { cellphone },
      { level },
      { password }

    )
    await LoginServiceImp.register(name, email, cellphone, level, password)
    return customResponse.send_ok('Usuário criado com sucesso!')
  } catch (err) {
    return next(err)
  }
})
LoginController.post('/signup', async (request: Request, _: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body

    validator.validate(
      { email },
      { password }
    )

    await LoginServiceImp.signup(email, password)
    return customResponse.send_ok('Usuário registrado com sucesso!')
  } catch (err) {
    return next(err)
  }
})

export default LoginController