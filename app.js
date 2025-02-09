import express from 'express'
import dotenv from 'dotenv'
import productsRoutes from './src/routes/productsRoutes.js'
import usersRoutes from './src/routes/usersRoutes.js'
import categoriesRoutes from './src/routes/categoriesRoutes.js'
import ordersRoutes from './src/routes/ordersRoutes.js'
import mongoose from 'mongoose'
import path from 'path'
dotenv.config()

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    next()
})

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', ordersRoutes)

const uploadsPath = path.resolve('uploads')
app.use('/uploads', express.static(uploadsPath))

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch(err => console.log(err))

