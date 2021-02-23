import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import colors from 'colors'
import productRouters from './routers/productRouters.js'
import categoryRouters from './routers/categoriRouters.js'
import userRouters from './routers/userRouters.js'
import orderRouters from './routers/orderRouters.js'
import * as ErroMiddleware from './middleware/errorMiddleware.js'

const app = express()

// Execute dotenv
dotenv.config()

// Enable Cors
app.use(cors())
app.options('*', cors())

// Middleware

app.use(bodyParser.json())
app.use(morgan('tiny'))

// Define Variables
const api = process.env.API_URL
const port = process.env.PORT ? process.env.PORT : 5000

// Routers
app.use(`${api}/products`, productRouters)
app.use(`${api}/categories`, categoryRouters)
app.use(`${api}/users`, userRouters)
app.use(`${api}/orders`, orderRouters)

// Connect with MongoDB
connectDB()

// Custom Error Handling
app.use(ErroMiddleware.notFound)
app.use(ErroMiddleware.errorHandler)

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running at http://localhost:${port}`.green.underline.bold
  )
})
