import { Router, json, urlencoded } from 'express'
import terminalConsole from './middlewares/TerminalConsole'
import CustomResponse from './customResponse/CustomResponse'
import cors from 'cors'

let customResponse: CustomResponse 

export const initializeMiddlewares = (app: Router) => {
  const ip = process.env.IP
  const port = process.env.PORT
  app.use(cors({
    origin: process.env.CORS_URL ?? 'http://25.18.66.27:5000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }))

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