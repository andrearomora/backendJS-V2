import config from "../config/config.js"
import nodemailer from 'nodemailer'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mailGmail,
        pass: config.passGmail
    }
})

export const sendMail = async (req,res) => {

    const result = await transport.sendMail({
        from: config.mailGmail,
        to: 'andrea.erzm@gmail.com',
        subject: 'Correo de prueba 1',
        html: `
        <div>
            Contenido del correo
            <br> ${config.mailGmail}
            <b>Enviado con éxito</b>
        </div>
        `,
        attachements: []
    })
    console.log(result)
    res.send('Email sent')
}
