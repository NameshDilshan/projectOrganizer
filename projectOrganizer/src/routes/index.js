// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  //var name = req.query.name;
    var username = false;
    try{
      var context = req.session.context;
      username = req.session.context.username;
    }catch(e){
      username = false;
    }
    const data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : username 
  }
  res.render('index', data );
});

router.get('/client', (req, res) => {
  //var name = req.query.name;
    var username = false;
    try{
      var context = req.session.context;
      username = req.session.context.username;
    }catch(e){
      username = false;
    }
    const data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : username 
  }
  res.render('client', data )
});

router.get('/admin', (req, res) => {
  //var name = req.query.name;
    var username = false;
    try{
      var context = req.session.context;
      username = req.session.context.username;
    }catch(e){
      username = false;
    }
    const data = {
    title: 'Event Organizer',
    greeting: 'Welcome to Event Organizer',
    username : username 
  }
  res.render('admin', data )
});
module.exports = router