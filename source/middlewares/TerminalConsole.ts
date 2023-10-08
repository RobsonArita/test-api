import { NextFunction, Request, Router } from 'express'
import colors from 'colors'
import { timeAsDayjs } from '../time'

const methodColors = (method: string): string | void => {
  switch (method) {
    case 'POST':
      return colors.blue(method)
    case 'GET':
      return colors.green(method)
    case 'PUT':
      return colors.yellow(method)
    case 'DELETE':
      return colors.red(method)
    case 'PATCH':
      return colors.yellow(method)
    default:
  }
}

const terminalConsole = (request: Request, _, next: NextFunction) => {
  const method = methodColors(request.method.trim())
  if (!method) return next()

  const requester = colors.blue(request.ip.replace(/[^\d.]/g, ''))
  const path = colors.cyan(request.url)
  const timer = colors.white(timeAsDayjs().format('HH:mm') || '')

    console.info(`${timer} ${requester} ${method} ${path}`)
    if (Object.keys(request.body).length) console.info(request.body)

  return next()
}

export default terminalConsole