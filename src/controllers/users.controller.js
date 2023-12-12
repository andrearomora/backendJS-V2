import { userService } from "../services/index.js"
import { logger } from "../config/logger.js"
// import { multer } from 'multer'
// import { path } from 'path'


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/profiles')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// export const upload = multer({storage: storage})

export const getUsers = async(req,res) => {
    const result = await userService.getUsers()
    res.send({status: 'success', payload: result})
}

export const getUserById = async(req,res) => {
    const { uid } = req.params
    const result = await userService.getUserById(uid)
    res.send({status: 'success', payload: result})
}

export const saveUser = async(req,res) => {
    const user = req.body

    const result = await userService.saveUser(user)
    res.send({status: 'success', payload: result})
}

export const changeRole = async(req,res) => {
    const user = await userService.getUserById(req.params.uid)

    if (user.role == "user") {
        user.role = "premium"
        req.user = user
        logger.info('Role: '+ user.role)
        await userService.updateUser(user._id, user)
        
        res.send({status: 'success', payload: user})
        return
    }else{
        user.role = "user"
        req.user = user
        logger.info('Role: '+ user.role)
        await userService.updateUser(user._id, user)
        res.send({status: 'success', payload: user})
        return
    }
}