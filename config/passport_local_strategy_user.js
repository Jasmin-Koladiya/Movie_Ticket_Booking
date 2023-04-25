const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const user = require('../models/user');
const admin = require('../models/admin');

passport.use('user', new passportLocal({
    usernameField : "email"
}, async (email, password, done) => {
    var data = await user.findOne({email : email});
    if(data && data.password == password){
        return done(null, data);
    }
    else{
        return done(null, false);
    }
}));

passport.serializeUser((data, done)=>{
    return done(null, data.id);
});

passport.deserializeUser(async (id,done)=>{
    var data = await admin.findById(id);
    var data1 = await user.findById(id);
    if(data1?.role == 'user'){
        return done(null,data1);
    }
    else if(data?.role == 'admin'){
        return done(null,data);
    }
    else{
        return done(null,false);
    }
})

passport.checkAuthenticationuser = (req,res,next) =>{
    if(req.isAuthenticated()){
        if(req.user.role = 'user'){
            return next();
        }
        return res.redirect('/user/userlogin');
    }
    return res.redirect('/user/userlogin');
}


module.exports = passport;