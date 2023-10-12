import { NextFunction, Request, Response } from 'express'
import { customResponse } from '../middleware'
import { jwtFunction } from '../jwt/setupJWT'
import jwt from 'jsonwebtoken'


const Authenticated = async (request: Request, _: Response, next: NextFunction) => {
  const token = request.header('Authorization')
  if (!token) return customResponse.send_unauthorized('Sem permissão!')
  try {
    jwtFunction.verifyToken(token)
  } catch (err) {
    return customResponse.send_unauthorized('Sem permissão')
  }

  const secretKey = process.env.JWT_SECRET
  if (!secretKey) return customResponse.send_badRequest('Token inválida!')

  const err: any = jwt.verify(token, secretKey, (error, result: any) => {
    if (!result) return customResponse.send_badRequest('Token inválida!')
    if (error) return customResponse.send_badRequest('Token inválida!')
    //@ts-ignore
    request.userId = result._id
  })
  if (err) return customResponse.send_badRequest('Token inválida!')

  return next()
}

export default Authenticated