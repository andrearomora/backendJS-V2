import { userService, mailService } from "../services/index.js"
import { logger } from "../config/logger.js"
import multer from 'multer'
import __dirname from "../utils.js"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch (file.fieldname) {
            case 'profile':
                cb(null, './src/public/uploads/profiles');
                break;
            case 'product':
                cb(null, './src/public/uploads/products');
                break;
            case 'document':
                cb(null, './src/public/uploads/documents');
                break;
        }  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({storage: storage}).fields([
    { name: 'profile', maxCount: 1},
    { name: 'product', maxCount: 1},
    { name: 'document', maxCount: 1}
])

export const uploadUserFile = async(req,res) => {
    const { uid } = req.params
    const { documentType } = req.body
    const { profile, product, document } = req.files;
    const user = await userService.getUserById(uid)
    const userDocs = user.documents || []
    user.documents = userDocs

    if(profile){
        userDocs.push({
            type: 'profile',
            name: profile[0].filename,
            reference: profile[0].destination+'/'+profile[0].filename
        }) 
    }
    if(product){
        userDocs.push({
            type: 'product',
            name: product[0].filename,
            reference: product[0].destination+'/'+product[0].filename
        }) 
    }
    if(document){
        userDocs.push({
            type: documentType,
            name: document[0].filename,
            reference: document[0].destination+'/'+document[0].filename
        }) 
    }

    await userService.updateUser(uid, user)

    res.send({status: 'succes'})
}

export const getUsers = async(req,res) => {
    const result = await userService.getUsers()
    res.send({status: 'success', payload: result})
}

export const getCensoredUsers = async(req,res) => {
    const result = await userService.getCensoredUsers()
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
        let identificacion = false
        let domicilio = false
        let estadoCuenta = false
        for (const doc of user.documents) {
            if (doc.type == "identificacion") {identificacion=true}
            if (doc.type == "domicilio") {domicilio=true}
            if (doc.type == "estadoCuenta") {estadoCuenta=true}
        }
        if(identificacion==true && domicilio==true && estadoCuenta==true){
            user.role = "premium"
            req.user = user
            logger.info('Role: '+ user.role)
        }else{
            res.send({status: 'error', payload: 'No ha terminado de procesar su documentación'})
            return
        }
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

export const deleteUsers = async(req,res) => {
    const users = await userService.getUsers()
    const deletedUsers = []
    let time = Date.now() - 172800000
    console.log(time);
    for (const user of users) {
        if (user.last_connection < time){
            let email = user.email
            await userService.deleteUser(user._id)
            const data = {
                email,
                subject: `[SABIA CULTURA ECO] - Usuario eliminado por inactividad`,
                html: `
                    <p>Hola ${user.first_name},</p>
                    <p>Te enviamos este e-mail para notificar que tu cuenta ha sido eliminada por inactividad.</p>
                    <p>Recuerda que nuestras políticas recomiendan no estar más de dos días sin ingresar al sistema<p>
                    <br>
                    <p>Un saludo,</p>
                `
            }
            await mailService.sendMail(data)
            deletedUsers.push(email)
        }
    }
    res.send({status: 'success', payload: deletedUsers})
    return
}

export const deleteOneUser = async(req,res) => {
    const { uid } = req.params
    await userService.deleteOneUser(uid)
    res.send({status: 'success', payload: uid})
    return
}   

export const editUser = async(req,res) => {
    const { uid } = req.params
    const { rol } = req.body
    const user = await userService.getUserById(uid)
    user.role = rol
    await userService.updateUser(uid, user)
    res.send({status: 'success', payload: user})
    return
}