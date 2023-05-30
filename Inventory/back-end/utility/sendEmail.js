var nodemailer = require('nodemailer');

var sendEmail = async (EmailTo, EmailText, EmailSubject) => 
{

    let transporter = nodemailer.createTransport(
        {
            host: 'mail.abutorab.me',
            port: 25,
            secure: false,
            auth: {
                user: "info@abutorab.me",
                pass: 'web.3.84@abu'
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    );


    let mailOptions = {
        from: 'Inventory  <info@abutorab.me>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)

}

module.exports=sendEmail