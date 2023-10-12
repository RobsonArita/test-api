import { NextFunction, Request, Response } from 'express'
import { customResponse } from '../middleware'
import { jwtFunction } from '../jwt/setupJWT'

const Authenticated = async (request: Request, _: Response, next: NextFunction) => {
  const token = request.header('Authorization')
  if (!token) return customResponse.send_unauthorized('Sem permissão!')

  try {
    jwtFunction.verifyToken(token)
  } catch (err) {
    return customResponse.send_unauthorized('Sem permissão')
  }

  return next()
}

export default Authenticated