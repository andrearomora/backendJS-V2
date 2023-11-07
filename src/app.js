import express from "express"
import config from './config/config.js'
import __dirname from './utils.js'
import usersRouter from './routes/users.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'


const app =  express()

app.use("/public", express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(config.port, () => console.log('Listening... '))