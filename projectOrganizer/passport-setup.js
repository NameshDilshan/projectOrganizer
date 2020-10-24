const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    //User.findById(id, function(err, user) {
        done(null, user);
    //});
  });

passport.use(new GoogleStrategy({
    clientID: '928655147302-brlfs7i3ffhsujqcndb11vie1a3hmq9l.apps.googleusercontent.com',
    clientSecret: '-vo9uY_ppZnUdfja3ryPUKkT',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      // use the profile info (mainly profile id) to check if the user is registed in ur db
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile.id);
      console.log(profile.displayName);
      return done(null, profile);
    //});
  }
));