const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shoebabedin12@gmail.com",
          pass: "fztlhbrylzrdnjzy", 
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'shoebabedin12@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: template(verify), // html body
      });
}

module.exports = sendEmail;