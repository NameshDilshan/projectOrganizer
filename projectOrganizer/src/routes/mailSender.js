const express = require('express');
const nodemailer = require('nodemailer');
const mustache = require('mustache');
const router = express.Router();
const app = express();

const websiteEmailAddress = process.env.websiteEmailAddress;
const websitePassword = process.env.websitePassword;
const adminEmailAddress = process.env.adminEmailAddress;

router.use(express.urlencoded({
  extended: true
}));

router.post('/adminContactSendMail', (req, res) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;
    console.log();

    
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: websiteEmailAddress,
    pass: websitePassword
  }
});

var mailOptions = {
  from: websiteEmailAddress,
  to: adminEmailAddress,
  subject: 'Event Organizer App New Service Provider Notification',
  /* text: mustache.render("<html><body><div> <h3> Name : <h3>" + name + 
    " <br/> <h3> Phone : <h3>" + phone + 
    " <br/> <h3> Email : <h3>" + email + 
    " <br/> <h3> Message : <h3>" + message + " <br/> </div></body></html>"), */
   html: "<html><body> <p style='font-size: 20px;'> Name :  " + name + 
    " <br/>  Phone : " + phone + " <br/>  Email : " + email + 
    " <br/>  Message :" + message + " </p><br/> </body></html>"
   };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    res.render('index');
});



module.exports = router;