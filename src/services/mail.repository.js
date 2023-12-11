import nodemailer from 'nodemailer'
import config from "../config/config.js"

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mailGmail,
        pass: config.passGmail
    }
})

export default class MailRepository {

    sendMail = async (data) => {

        const mail = await transport.sendMail({
            from: config.mailGmail,
            to: data.email,
            subject: data.subject,
            html: data.html + `
            <br>
            <tr height="20" style="height:15.0pt">
            <td height="20" width="98" style="height:15.0pt;width:74pt">
            <img width="71" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4wiTRfTMHkzf908u6xvOH6cKFCTlGCSxBHihzWTHw236Mu7qiW7HYhJej8M9gSihK99E6i5nyE" class="CToWUd" data-bit="iit">
            </td>
            <td width="182" style="width:137pt">
            <h3 color="#000000" style="font-family:Arial;margin:0px;font-size:18px;color:rgb(0,0,0)">Departamento&nbsp;Web</h3>
            <table cellpadding="0" cellspacing="0" style="color:rgb(34,34,34);font-family:Arial;font-size:medium;vertical-align:-webkit-baseline-middle;width:175px">
            <tbody>
            <tr></tr><tr>
            <td color="#11b28e" height="1" style="width:175px;border-bottom:1px solid rgb(17,178,142);border-left:none;display:block"></td>
            </tr>
            </tbody>
            </table>
            <table cellpadding="0" cellspacing="0" style="color:rgb(34,34,34);font-family:Arial;font-size:medium;vertical-align:-webkit-baseline-middle">
            <tbody>
            <tr height="25" style="vertical-align:middle">
            <td width="30" style="vertical-align:middle">
            <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle">
            <tbody><tr>
            <td style="vertical-align:bottom"><span color="#11b28e" width="11" style="display:block;background-color:rgb(17,178,142)">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NY-ugLnvhx8EKeU0NoFaQJxnwUBulA05De1Rj0lx5Itfo-At2BqiyZXrzXbvQpcbueon521QOzfNQ1y06xq7dVDLerq6ZY-nsYtDo9sdlsmC5ul1-T6XUQ4kEevfpeLQJDdM73VqUrTn1dnZ8Q_IA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" color="#11b28e" width="13" style="display:block" class="CToWUd" data-bit="iit">
            </span></td></tr>
            </tbody>
            </table></td><td style="padding:0px;color:rgb(0,0,0)"><a href="tel:318+225+82+35" color="#000000" style="color:rgb(0,0,0);font-size:12px" target="_blank">(+57) 318 225 82 35</a></td></tr><tr height="25" style="vertical-align:middle"><td width="30" style="vertical-align:middle"><table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle"><tbody><tr><td style="vertical-align:bottom"><span color="#11b28e" width="11" style="display:block;background-color:rgb(17,178,142)">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NZKllki1F8xHX3XP1B8cJ115cbaoAUYAu0XTemKLCDs4_mFQYcGkKTngars90NA25lBabg-0V6FL9Mdhi9cigSGVAoYg4fcRMPJxQoDUevRI9C9IJiurl0-cw3g5URKDFkoNJmeT24yAoCOJzjgkA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" color="#11b28e" width="13" style="display:block" class="CToWUd" data-bit="iit">
            </span></td></tr></tbody>
            </table></td><td style="padding:0px"><a href="mailto:sabiaculturaeco@gmail.com" color="#000000" style="color:rgb(0,0,0);font-size:12px" target="_blank">sabiaculturaeco@gmail.com</a></td></tr><tr height="25" style="vertical-align:middle"><td width="30" style="vertical-align:middle"><table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle"><tbody><tr><td style="vertical-align:bottom"><span color="#11b28e" width="11" style="display:block;background-color:rgb(17,178,142)">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NZvHSmYu2-NCG_NPzpk6NN_gLctE_NdNQKl7PyZGOXUs0vhhus3sq6WQfnK-AYvhuwDc7H9-s1s_Oh-WV_dXppqqemufsUxJXZX8qrOyxW_1Ers_LaxvK1fdZqA5notV1_TjaMGyU0Sd9UgtjvB=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" color="#11b28e" width="13" style="display:block" class="CToWUd" data-bit="iit"></span>
            </td></tr></tbody>
            </table></td><td style="padding:0px"><a href="https://www.sabiaculturaeco.com.co/" color="#000000" style="color:rgb(0,0,0);font-size:12px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sabiaculturaeco.com.co/&amp;source=gmail&amp;ust=1702317100731000&amp;usg=AOvVaw2Ct1jTl-UHlZPokqRy6IAo">www.sabiaculturaeco.com.co</a></td></tr></tbody></table></td></tr>
            `,
            attachements: []
        })
        
        return mail
    }


}