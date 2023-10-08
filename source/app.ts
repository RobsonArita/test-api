import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { initializeDatabase } from './database'
import { initializeServer } from './server'
import { initializeRoutes } from './routes'


dotenv.config()

const app = express()
const server = http.createServer(app)

initializeDatabase()
initializeRoutes(app)
initializeServer(server)


