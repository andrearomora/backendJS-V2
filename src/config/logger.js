import winston from "winston"
import config from "./config.js"

let levelConsole = ''
let levelFile = ''

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

if (config.node_env == 'development') {
    levelConsole = 'debug'
    levelFile = 'warning'
}else{
    levelConsole = 'info'
    levelFile = 'error'
}

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: levelConsole,
            format: winston.format.combine(winston.format.simple()),
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.json()
              ),
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: levelFile,
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`)

    next()
}