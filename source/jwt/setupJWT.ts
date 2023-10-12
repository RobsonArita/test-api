import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET

export const generateToken = (data: any): string => {
  if (!secretKey) return 'Could not found secret key'
  return jwt.sign(data, secretKey, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
  if (!secretKey) return null
  try {
    return jwt.verify(token, secretKey)
  } catch (err) {
    console.warn(err)
    return null
  }
}