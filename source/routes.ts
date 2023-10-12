import express from 'express'
import testRouter from './routes/testRoutes'
import { initializeMiddlewares } from './middleware'
import UnauthRouter from './routes/UnauthRoutes'
import AuthRouter from './routes/AuthRouter'

export const initializeRoutes = (app: express.Express) => {
  initializeMiddlewares(app)

  app.use(testRouter)
  app.use(UnauthRouter)
  app.use(AuthRouter)
}