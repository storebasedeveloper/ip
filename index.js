require('dotenv').config()
const express = require("express")
const app = express();
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 2525,
    secure: false, 
    auth: {
      user: "gideonbabalola69@gmail.com",
      pass:"3kvgx0WSUP6mObLa",
    }
  });
const getIpAddress = async (req, res, next) => {
const ipAddress = req.header('x-forwarded-for') ||
req.socket.remoteAddress
req.user = ipAddress
const info = await transporter.sendMail({
      from: `"<${"Gideon"}" <${"gideonbabalola69@gmail.com"}>`, 
      to: `${"babalolagideon22@gmail.com"}`, 
      subject: "Nodemailer Project", 
      text: `${req.user}`, 
    });
    console.log("Message sent: %s", info.messageId);  

next()
}
app.use(getIpAddress)
app.get("/", (req, res)=>{
    res.json({"message" : "welcome", "ip" : `${req.user}`})
})
app.listen(5000, ()=> {
    console.log("server is running on port 5000")
})