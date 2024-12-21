import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDatabase from './config/database.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Database Connection
connectDatabase()

// Middleware for CORS handling
app.use((req, res, next) => {
  const allowedOrigins = req.headers.origin || '*' // Dynamically allow the request origin
  res.header('Access-Control-Allow-Origin', allowedOrigins)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true') // For cookies
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }
  next()
})

app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
