const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

    User.findOne({email})
    .then(foundUser => {
        if(!foundUser || !bcrypt.compareSync(password, foundUser.password)) { 
            return done(null, false, {message: "Incorrect email or password"})
        }
        return done(null, foundUser)
        
    }).catch(err => new Error(err))
   
}))