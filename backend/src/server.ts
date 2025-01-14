import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

const app = express()

// cors
app.use(cors(corsConfig))

dotenv.config()
connectDB()

app.use(express.json()) // Para que express entienda los JSON
app.use('/api', router)

export default app
