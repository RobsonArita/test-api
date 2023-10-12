import { NextFunction, Request, Response, Router } from 'express'
import User from './UserMongoDB'
import { customResponse } from '../../middleware'
const UserController = Router()

UserController.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await User.findOne().lean()
    console.log({ user })

    return customResponse.send_ok('Tudo certo', { user })
  } catch (err) {
    next(err)
  }
})


export default UserController