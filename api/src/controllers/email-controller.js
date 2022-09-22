const {createTransport} = require('nodemailer');

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

const mailOptions = {
    from: 'Prueba desde el servidor de NodeJS',
    to: 'horusinhue@gmail.com',
    subject: 'Creando una prueba',
    html: 'Creando una prueba más'
}


const sendMailWelcome = async (req, res) => {
    let {name, to} = req.body

    const mailOptions = {
        from: 'Prueba desde el servidor de NodeJS',
        to: to,
        subject: 'Creando una prueba',
        html: `Hola ${name}, te damos la bienvenida HenryTicket donde tendrás acceso a los mejores eventos`
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