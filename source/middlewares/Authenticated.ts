import { NextFunction, Request, Response } from 'express'
import { customResponse } from '../middleware'
import { jwtFunction } from '../jwt/setupJWT'
import jwt from 'jsonwebtoken'


const Authenticated = async (request: Request, _: Response, next: NextFunction) => {
  try {
  const token = request.header('Authorization')
  if (!token) throw ''

  const secretKey = process.env.JWT_SECRET
  if (!secretKey) throw ''

  const err: any = jwt.verify(token, secretKey, (error, result: any) => {
    if (!result) throw ''
    if (error) throw error

    request.userId = result._id
    request.level = result.level
  })
  if (err) throw err

  return next()
  } catch (err) {
    return customResponse.send_forbidden('Token inválida!')
  }
}

export default Authenticated