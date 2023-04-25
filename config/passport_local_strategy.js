const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const admin = require('../models/admin');

passport.use('admin',new passportLocal({
    usernameField : "email"
}, async (email, password, done) => {
    var data = await admin.findOne({email : email});
    if(data && data.password == password){
        return done(null, data);
    }
    else{
        return done(null, false);
    }
}));

passport.checkAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        if(req.user.role = "admin"){
            return next();
        }
        return res.redirect('/login');
    }
    return res.redirect('/login');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role = "admin"){
            res.locals.user = req.user;
        }
    }
    next();
}
module.exports = passport;