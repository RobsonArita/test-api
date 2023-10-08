import { Router, json, urlencoded } from 'express'
import terminalConsole from './middlewares/TerminalConsole'
import CustomResponse from './customResponse/CustomResponse'

let customResponse: CustomResponse 

export const initializeMiddlewares = (app: Router) => {
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.use(terminalConsole)
  app.use((req, res, next) => {
    res.type('json')
    customResponse = new CustomResponse(res)
    next()
  })
}

export { customResponse }