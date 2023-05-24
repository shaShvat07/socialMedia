const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "297118051058-8h8h9bqbtndbfkhjkbe39qru7mkm2cp7.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
    async function(accessToken, refreshToken, profile, done){
        try {
            // find a user
            let user = await User.findOne({email: profile.emails[0].value});
            console.log(accessToken, refreshToken);
            console.log(profile);
            if(user){
                // if found , set this user as req.user
                return done(null, user);
            }
            else{
                // if not found, create the user and then set it as req.user
                try {
                    let user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });

                    return done(null, user);
                } catch (err) {
                    console.log('Error in creating user google-strategy-passport', err);
                    return;
                }

            }
            
        } catch (err) {
            console.log('Error in google-strategy-passport!', err);
            return;
        }
    }  
));

module.exports = passport;