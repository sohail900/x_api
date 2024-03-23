import express from 'express'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import path from 'path'
import Router from './router/router'
import { errMiddleware } from './middleware/error/errorMiddleware'
import './config/config'
import './config/cloudinaryConfig'
const app = express()
const server = http.createServer(app)
//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
//enable only for local file handling
//app.use('/upload', express.static(path.resolve(__dirname, '../upload')))
app.use('/api/v1', Router)
app.use(errMiddleware)
//TODO: SERVER RUNNING ON PORT 3000
server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
