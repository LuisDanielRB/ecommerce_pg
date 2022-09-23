const {createTransport} = require('nodemailer');
const path = require('path')
const hbs = require('nodemailer-express-handlebars')



let password='jdwosmhgbyqjjzls'
let correo='tickethenryinfo@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: correo,
        pass: password
    }
})





const sendMailWelcome = async (req, res) => {
    let {name, to} = req.body

    /* */
    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('./views'),
            defaultLayout: false,
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.handlebars'
    }
    
    transporter.use('compile', hbs(handlebarOptions))

    /* */

    const mailOptions = {
        from: 'Prueba desde el servidor de NodeJS',
        to: to,
        subject: 'Creando una prueba',
        template: 'email',
        context: {
            user: name,
            mail: to
        }
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Correo enviado satisfactoriamente")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendMailWelcome
}