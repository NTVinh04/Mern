const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json({ limit: '10mb' })) // Tăng giới hạn JSON payload
app.use(express.urlencoded({ limit: '10mb', extended: true })) // Tăng giới hạn URL-encoded payload
app.use(cookieParser())

app.use("/api", router)

const PORT = 5001 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to MongoDB')
        console.log(`Server is running on port ${PORT}`)
    })
})