import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import CustomResponse from '../customResponse/CustomResponse'

interface Error {
  code: string
  message: string
  data: any
}

const ErrorHandler = async (error: Error, request: Request, response: Response, next: NextFunction) => {
  const customResponse = new CustomResponse(response)
  if (!error) return customResponse.send_internalServerError('Cade o error???')
  switch (error.code) {
    case 'notFound': return customResponse.send_notFound(error.message, error.data)
    default: return customResponse.send_internalServerError('Quebro', error)
  }
}

export default ErrorHandler