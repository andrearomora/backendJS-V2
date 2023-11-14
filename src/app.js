import express from "express"
import config from './config/config.js'
import __dirname from './utils.js'
import usersRouter from './routes/users.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import sessionRouter from './routes/session.router.js'
import viewsRouter from './routes/views.router.js'
import initializePassport from "./config/passport.config.js"
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'


const app =  express()

app.use("/public", express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/session', sessionRouter)

app.listen(config.port, () => console.log('Listening... '))
