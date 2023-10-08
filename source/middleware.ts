import { Router, json, urlencoded } from 'express'
import terminalConsole from './middlewares/TerminalConsole'

export const initializeMiddlewares = (app: Router) => {
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.use(terminalConsole)
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}