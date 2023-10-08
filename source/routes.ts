import express from 'express'
import testRouter from './routes/testRoutes'
import { initializeMiddlewares } from './middleware'

export const initializeRoutes = (app: express.Express) => {
  initializeMiddlewares(app)

  app.use(testRouter)
}