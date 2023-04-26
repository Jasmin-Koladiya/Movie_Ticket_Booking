const { Admin } = require('mongodb');
const User = require('../models/user')
const nodemailer = require('nodemailer');

module.exports.usersignupdata  = function (req,res) {
    User.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("Already registr.");

            return res.redirect('back');
        }
        else {
           
            if (req.body.password == req.body.cpassword) {
                    req.body.role = "user";
                User.create( req.body,function (err, data) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('/user/userlogin');
                });
            }
            else {
                console.log("Password not match");
                return res.redirect('/');
            }
        }
    });
}
module.exports.userlogin = function(req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        res.render('userlogin');
    };
module.exports.usersession = function (req, res) {
    return res.redirect('/dashboard')
};
module.exports.usersignup = function(req, res) {
    return res.render('usersignup')
}
module.exports.userlogindata = function(req, res) {
    
        return res.redirect('/');
   
};

module.exports.checkmaile = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, userdata) {
        if (err) {
            return res.redirect('/lostpass');
        }
        if (userdata) {
            var otp = Math.ceil(Math.random() * 10000)
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "5f6da7ebb8308f",
                    pass: "bcd6b4718657af"
                }
            });
            let info = transport.sendMail({
                from: 'jasminkoladiya098@gmail.com',
                to: userdata.email,
                subject: "testing node email",
                text: "check OTP",
                html: `<b>your OTP:${otp} </b>`,
            });
            res.cookie('otp', otp);
            res.cookie('email', userdata.email);
            return res.render('checkotp');
        }
        else {
            return res.redirect('/lostpass');
        }

    })
}

module.exports.verifyotp = function (req, res) {
    if (req.body.otp == req.body.otp) {
        return res.render('generatenewpass');
    }
    else {
        return res.redirect('/checkotp');
    }
}
module.exports.resetpassword = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        User.findOne({ email: req.cookies.email }, function (err, record) {
            if (err) {
                console.log(err);
                return res.redirect('back');
            }
            if (record) {
                User.findByIdAndUpdate(record.id, {
                    password: req.body.npass
                }, function (err) {
                    if (err) {
                        return res.redirect('back');
                    }
                    else {
                        return res.redirect('/user/userlogin');
                    }
                })
            }
        })
    }
    else {
        console.log("password not created");
        return res.redirect('/generatenewpass');
    }
}

