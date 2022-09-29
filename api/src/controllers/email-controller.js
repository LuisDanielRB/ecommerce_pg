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
        to: mail,
        subject: 'Creando una prueba',
        template: 'email',
        context: {
            user: us,
            mail: mail
        }
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Correo enviado satisfactoriamente")
    } catch (error) {
        console.log(error)
    }
}

const passwordRecovery = async ( req, res, next ) => {
	let { email } = req.body;
	try
	{
	  let user = await Users.findOne( {
		where: {
		  email: email,
		},
	  } );
	  if ( !user ) return res.status( 400 ).send( 'User not found' );
  
	  await transporter.sendMail(
		{
		  from: 'Test',
		  to: user.email,
		  subject: `Password recovery email`,
		  html: `<h4>You are receiving this mail because a password reset was requested</h4>
			  <p>Click the following link to start reseting your password: <a href="http://localhost:5173/recovery/${ user.id }">Click here</a>.
			  <br>Or copy & paste this URL in your browser: http://localhost:5173/recovery/${ user.id }</p>
			  <p>This mail was sent by a bot, do not respond! Thank you!</p>`
		}, ( err, info ) => {
		  if ( err )
		  {
			res.status( 400 ).send( err.message );
		  } else
		  {
			res.status( 200 ).json( info );
		  }
		} );
	} catch ( err )
	{
	  next( err );
	}
  };


module.exports = {
    sendMailWelcome,
    passwordRecovery
}