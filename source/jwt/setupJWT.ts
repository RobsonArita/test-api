import jwt from 'jsonwebtoken'
import { customResponse } from '../middleware'


const generateToken = (data: any): string => {
  const secretKey = process.env.JWT_SECRET
  if (!secretKey) return 'Could not found secret key'
  return jwt.sign(data, secretKey, { expiresIn: '1h' })
}

const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET
  if (!secretKey) return null
  try {
    return jwt.verify(token, secretKey)
  } catch (err) {
    console.warn(err)
    return null
  }
}

export const jwtFunction = {
  generateToken,
  verifyToken
}