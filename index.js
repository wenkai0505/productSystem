
const express = require('express')
const app = express()
const ejs = require('ejs')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const session = require('express-session')

let port = process.env.PORT || 3000


mongoose
    .connect(process.env.CONNECT_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connect To MongoDB Atlas Success')
    })
    .catch((err) => {
        console.log('連接資料庫失敗')
        console.log(err)
    })


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use((req, res, next) => {
    if (req.url == '/user/login') {
        next()
    }
    else {
        if (req.session.userinfo) {
            res.locals.user = req.session.userinfo
            next()
        }
        else {
            res.redirect('/user/login')
        }
    }
})
app.use('/user', userRouter)
app.use('/product', productRouter)




app.get('/', (req, res) => {
    res.send('Welcome to Product System.')
})








app.listen(port, () => {
    console.log(`Server is Running on Port ${port}.`)
})