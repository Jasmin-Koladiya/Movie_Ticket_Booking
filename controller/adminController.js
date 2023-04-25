const Admin = require('../models/admin')
const Movie = require('../models/movie')
const nodemailer = require('nodemailer');

module.exports.admin = async function (req, res) {
    var moviedate = await Movie.find({isactive: 1});
    return res.render('home', {
        data: moviedate
    })
};

module.exports.dashbordsession = function (req, res) {
    return res.redirect('/dashboard')
};

module.exports.dashboard = function (req, res) {
    return res.render('dashboard')
};

module.exports.add_admin = (req, res) => {
    return res.render('add_admin');
};

module.exports.addUserData = async (req, res) => {
    req.body.role = "admin";
    var userdata = await Admin.create(req.body);
    if (userdata) {
        return res.redirect('back')
    }
};

module.exports.view_admin = async (req, res) => {
    var data = await Admin.find({});
    return res.render('view_admin', {
        data: data
    })
};

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login');
};

module.exports.checkmaile = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, userdata) {
        if (err) {
            return res.redirect('/admin_lostpass');
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
            return res.render('admin_checkotp');
        }
        else {
            return res.redirect('/admin_lostpass');
        }

    })
}

module.exports.verifyotp = function (req, res) {
    if (req.body.otp == req.body.otp) {
        return res.render('admin_generatenewpass');
    }
    else {
        return res.redirect('back');
    }
}
module.exports.resetpassword = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        Admin.findOne({ email: req.cookies.email }, function (err, record) {
            if (err) {
                console.log(err);
                return res.redirect('back');
            }
            if (record) {
                Admin.findByIdAndUpdate(record.id, {
                    password: req.body.npass
                }, function (err) {
                    if (err) {
                        return res.redirect('back');
                    }
                    else {
                        return res.redirect('/login');
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
module.exports.profile = async function (req,res) {
    var pdata = await Admin.findById(req.params.id);
    if(pdata){
        return res.render('profile',{
            data:pdata
        })
    }
    else{
        console.log("data not found ");
    }
}
module.exports.edite_profile = async  function (req,res) {
    let data = await Admin.findByIdAndUpdate(req.body.id,req.body);
    if (data) {
        return res.redirect('/login');
    }
    else {
        console.log('Error record not update');
    }
}
module.exports.updatepassword = function (req,res) {
    return res.render('updatepassword')
}
module.exports.changepass = function(req,res){
    var userpass = req.user.password;
    var curentpass = req.body.curentpass;
    var npass = req.body.npass;
    var cpass = req.body.cpass;
    if(userpass == curentpass){
        if(curentpass != npass)
        {
            if(npass == cpass){
                Admin.findByIdAndUpdate(req.user.id,{
                    password : npass
                },function(err,passUpdated){
                    if(err){
                        console.log("somethign wrong");
                        return res.redirect('back');
                    }
                    return res.redirect('/login')
                })
            }
            else{
                console.log("new & confirm  password not match");
                return res.redirect('back');
            }
        }
        else{
            console.log("current or new password are match");
            return res.redirect('back');
        }
    }
    else{
        console.log("current password not match");
        return res.redirect('back');
    }
}

module.exports.registration = function (req, res) {
    res.render('register');

}

module.exports.register = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, data) {
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
                Admin.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'admin',
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('/login');
                });
            }
            else {
                console.log("Password not match");
                return res.redirect('back');
            }
        }
    });
}
module.exports.delete_user = async function (req, res) {
    const id = req.params.id;
    const record = await Admin.findByIdAndDelete(id);
    if (record) {
      return res.redirect('/logout');
    }
    else{
        console.log('User not found');
    return res.status(404).send('User not found');
    }
  };

  module.exports.updateData = async function (req, res) {
    let Update =  await Admin.findById(req.params.id);
    if (Update) {
        return res.render('update_admin', {
                    data: Update
                });
    }
    else{
        console.log('record not update');
    }
}

module.exports.editData = async function (req, res) {
    let data = await Admin.findByIdAndUpdate(req.body.id,req.body);
    if (data) {
        return res.redirect('/view_admin');
    }
    else {
        console.log('Error record not update');
    }
}