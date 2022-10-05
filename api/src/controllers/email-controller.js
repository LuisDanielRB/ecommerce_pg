const {createTransport} = require('nodemailer');
const {Users} = require('../db')
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


const sendMailWelcome = async (us, mail) => {
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
        to: mail,
        subject: 'Creando una prueba',
        template: 'email',
        context: {
            user: us,
            mail: mail,
        }
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Correo enviado satisfactoriamente")
    } catch (error) {
        console.log(error)
    }
}

const emailReset = async (email, id) => {
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


const mailOptions = {
  from: 'Prueba desde el servidor de NodeJS',
  to: email,
  subject: 'Reestablecimiento de contraseña',
  template: 'ressetPass',
  context: {
       user: id,
      
  }
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log("correo enviado correctamente")
} catch (error) {
    console.log(error.message)
}

}

const passwordRecovery = async ( req, res, next ) => {
	let { email } = req.body;
  console.log("Esto es lo que llega al back", email)

  try {
    let user = await Users.findOne( {
      where: {
        email: email,
      },
      } );
      if ( !user ) return res.status( 400 ).send( 'User not found' );
      const {id} = user.dataValues
      emailReset(email, id)
      console.log("Este es el id", id)
      console.log("correo enviado")
      return res.status(200).send('Correo de reestablecimiento enviado correctamente')

  } catch (error) {
    console.log("Este es el error en el back", error.message)
    res.status(500).send("El usuario no existe")
  }


  };


module.exports = {
    sendMailWelcome,
    passwordRecovery
}