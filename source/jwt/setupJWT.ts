import jwt from 'jsonwebtoken'
import { customResponse } from '../middleware'


const generateToken = (data: any): string => {
  const secretKey = process.env.JWT_SECRET
  if (!secretKey) return 'Could not found secret key'
  return jwt.sign(data, secretKey, { expiresIn: '1h' })
}

export const jwtFunction = {
  generateToken
}