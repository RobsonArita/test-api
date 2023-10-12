import { NextFunction, Request, Response } from 'express'
import { customResponse } from '../middleware'
import { jwtFunction } from '../jwt/setupJWT'

const Authenticated = async (request: Request, _: Response, next: NextFunction) => {
  const token = request.header('Authorization')
  if (!token) throw customResponse.send_badRequest('Sem permissão!')

  try {
    jwtFunction.verifyToken(token)
  } catch (err) {
    throw customResponse.send_badRequest('Sem permissão')
  }

  return next()
}

export default Authenticated