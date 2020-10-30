const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    var username = false;
    var googleId = "";
    var email = "";
    try{
      username = req.session.context.username;
      googleId = req.session.context.googleId;
      email = req.session.context.email;
    }catch(e){
      username = false;
      googleId = "";
      email = "";
    }
    const data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : username ,
    googleId : googleId,
    email : email
  }
  res.render('index', data );
});

router.get('/client', (req, res) => {
    var username = "";
    var googleId = "";
    var email = "";
    var data ;
    try{
      var context = req.session.context;
      username = req.session.context.username;
      googleId =req.session.context.googleId;
      email = req.session.context.email;
    }catch(e){
      username = "";
      googleId = "";
      email = "";
    }
    data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : username ,
    googleId : googleId,
    email : email  
  } 
  res.render('client', data )
});

router.get('/admin', (req, res) => {
  var admin = false;
  var data ;
  if(req.session.context.admin != null){
    admin = req.session.context.admin;
  }else{
    admin = false;
    res.render('/');
  }
  data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : "" ,
    admin : admin
  }   
  res.render('admin', data );
});
module.exports = router