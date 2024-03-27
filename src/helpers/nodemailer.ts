import nodemailer from "nodemailer"

export const sendEmail = async({email, emailType, userId}:any)=>{
try {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "57c25b40adb092",
          pass: "3777f5ca1ed44e"
        }
      });
      const mailOptions = {
        from: 'sikandar@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? "Verify Your email" : "reset your password", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse
} catch (error) {
    
}
}