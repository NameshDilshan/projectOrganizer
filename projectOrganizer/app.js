// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const express = require('express')
const passport = require('passport');
const cookieSession = require('cookie-session')
var schedule = require('node-schedule');
const Client = require('./src/models/client');
const dateFormat = require('dateformat');
require('./passport-setup');

const app = express(); // initialize app

/*  Apps are configured with settings as shown in the conig object below.
    Options include setting views directory, static assets directory,
    and database settings. Default config settings can be seen here:
    https://docs.turbo360.co */

const config = {
  views: 'views', // Set views directory
  static: 'public', // Set static assets directory
  logging: true,

  /*  To use the Turbo 360 CMS, from the terminal run
      $ turbo extend cms
      then uncomment line 21 below: */

  // db: vertex.nedb()
}

vertex.configureApp(app, config)
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if(req.user){
    next()
  }else{
    res.sendStatus(401);
  }
}
app.use(passport.initialize());
app.use(passport.session());
// import routes
const index = require('./src/routes/index')
const api = require('./src/routes/api') // sample API Routes
const mailsender = require('./src/routes/mailSender');
const clientRoutes = require('./src/routes/clientRoutes');
const serviceProviderRoutes = require('./src/routes/serviceProviderRoutes');
const clientController = require('./src/controllers/clientController');
const { default: Swal } = require('sweetalert2');
// set routes
app.use('/', index);
app.use('/api', api) // sample API Routes
app.get('/failed', function(req, res) {
  return res.redirect('/');
});
app.get('/good', (req, res) => {
  var username = req.user.displayName;
  var email = req.user.emails[0].value;
  var id = req.user.id;
  var context = {
    "googleId" : id,
    "email" : email,
    "username" : username
  }; 
   req.body = {
    'googleId' : id,
    'email' : email,
    'name' : username
  }; 
  clientController.findOrCreate(req, res);
  req.session.context = context;
  res.redirect('/');
});

app.post('/login', (req, res) => {
  if(req.body.email == process.env.adminEmailAddress && req.body.password === process.env.adminEmailPassword){
    var data = {
      'admin' : true
    }
    req.session.context = data;
    res.json('success');
    res.redirect('/admin');
  }else{
    res.body = 'failed';
    res.json('failed');
  }
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate(
  'google', 
  { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });
app.get('/logout', (req, res) => {
  req.session = null,
  req.logOut();
  res.redirect('/');

});
app.post('/adminContactSendMail', mailsender);
app.get('/test', mailsender);
app.use('/clientApi', clientRoutes);    // access like     -> localhost:5000://clientapi/clients
app.use('/serviceProviderApi', serviceProviderRoutes);  // access like     -> localhost:5000://serviceProviderApi/clients



schedule.scheduleJob("0 0 * * * ", function(){     // 00 00 * * * *  cornjob min and hours  -->  https://crontab.guru/
  var now = new Date();
  now = dateFormat(now, "dd-mmm-yyyy");
    Client.findAll(function (err, client) {
        if (err){
            res.send(err);
        }else{
           for(i in client){
            if(client.hasOwnProperty(i)){
              var element = JSON.stringify(client[i]);
              element = JSON.parse(element);
              var name = element['name'];
              var email = element['email'];
                  console.log(name);
              var taskArray = ["setWeddingBudgetDate",
                  "finalizeGuestListDate",
                  "selectBridesmaidDate",
                  "chooseVenueDate",
                  "weddingRegistryDate",
                  "weddingDressDate",
                  "preweddingEventsDate",
                  "sendWeddingInvitationsDate",
                  "bookingSalonsDate",
                  "buyJewelerriesDate",
                  "makeOrdersForWeddingCakesDate",
                  "honeyMoonDate",
                  "finalizeFoodMenuDate",
                  "setaPartyBudgetDate",
                  "finalizeTheGuestListDate",
                  "birthdayCakeOrdersDate",
                  "setPartyInvitationsDate",
                  "chooseAndBookTheVenueDate",
                  "buyBirthdayGiftsDate",
                  "finalizeBirthdayFoodMenuDate"];
              taskArray.forEach(function(item, index){
                if(element[''+item+''] == now){
                  console.log("mail sent to client "+ item+" " + name);
                  mailsender.sendTaskEmailToClient(item, name, email);
                }
              });
            }
          } 
        } 
    });
});

module.exports = app
