const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientController = require('./src/controllers/clientController');
const client  = require('./src/models/client');

passport.serializeUser(function(user, done) {
  console.log("ser");
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    //Client.findById(user.id, function(err, user) {
      console.log("deser");  
      done(null, user);
    //});
  });

passport.use(new GoogleStrategy({
    clientID: '928655147302-brlfs7i3ffhsujqcndb11vie1a3hmq9l.apps.googleusercontent.com',
    clientSecret: '-vo9uY_ppZnUdfja3ryPUKkT',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
    // use the profile info (mainly profile id) to check if the user is registed in ur db
    // clientController.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log("profile.id : " + profile.id);
      console.log(profile.displayName);
    //  user = req.json;
      return done(null, profile);
    //}); 
  }
));