const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
    signUp(req, res) {
        const {firstName, lastName, email, password} = req.body;
        
        User.findOne( {email }).then(userFound => {
            if(!userFound){
                const bcryptsalt = 10;
                const salt = bcrypt.genSaltSync(bcryptsalt);
                const encryptedPassword = bcrypt.hashSync(password, salt);
                const bonsais = []
                User.create({ firstName, lastName, email, password: encryptedPassword, bonsais})
                .then(newUser => {
                    console.log("NEW USER!", newUser);
                    res.json({done: true});
                }).catch(err => console.error("An error just happened while signing up ", err));
            }else{
                res.json({message: "THIS EMAIL ALREADY EXISTS!"});
            }
        }).catch(err => {
            console.error(err);
        });
    },

    logInUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                res.json({message: "unexpected error", err});
            }
            if(!user) {
                res.json(info);
            }
   
            req.login(user, (err) => {
                user.password = undefined
                if(err){
                    res.json({message: "error authenticating"});
                    return;
                }
                res.status(200).json({user});
            })
        })(req, res, next);
    },

    loggedIn(req, res, next) {
        if(req.user){
            req.user.password = undefined;
            res.json(req.user);
        }else{
            res.json(null);
        }
    },

    logOut(req, res, next){
        req.logout();
        res.json({user: null});
    },

}