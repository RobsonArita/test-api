import { NextFunction, Request, Response, Router } from 'express'
import User from './UserMongoDB'
const UserController = Router()
UserController.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await User.findOne().lean()
    console.log({ user })
  } catch (err) {
    next(err)
  }
})


export default UserController