require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect('mongodb://localhost:27017/todo').then(()=> console.log("Connected"))

const userRouter = require('./router/user')
const todoRouter = require('./router/todo')

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)


app.listen(process.env.PORT, ()=> {
    console.log("Running")
})