import express from "express"
import config from './config/config.js'
import __dirname from './utils.js'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUiExpress from "swagger-ui-express"
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
import { logger, addLogger } from '../src/config/logger.js'

const app =  express()

app.use("/public", express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de la web SABIA CULTURA ECO',
            description: 'El proyecto se trata de una eccomerce para la venta de bolsas ecológicas'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
console.log(__dirname + specs);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/session', sessionRouter)
app.use(addLogger)

app.get('/loggerTest', (req,res) => {
    req.logger.fatal(`FATAL!!!!`)
    req.logger.error(`Se cayo el server`)
    req.logger.warning(`Dont worry... Warnning`)
    req.logger.info(`Se llamo a esta URL`)
    req.logger.http(`This is http`)
    req.logger.debug(`1+1===2`)
    res.send('Test finished')
})

app.listen(config.port, () => logger.info(`Listening...`))
