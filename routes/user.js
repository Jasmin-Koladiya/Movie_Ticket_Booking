const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const app = express();
const path = require("path");
app.use(express.static('assets'));

var routes = express.Router();
var UserController = require("../controller/userController");


routes.post("/userlogindata",passport.authenticate('user', {failureRedirect : '/user/userlogin'}) , UserController.userlogindata)
routes.get("/userlogin",UserController.userlogin)
routes.get("/usersignup",UserController.usersignup)
routes.post("/usersignupdata",UserController.usersignupdata)
routes.get("/lostpass",function(req, res){
    return res.render('lostpass')
  })
routes.post("/checkmaile",UserController.checkmaile)
routes.post('/verifyotp', UserController.verifyotp);
routes.post('/resetpassword', UserController.resetpassword);

routes.get("/userlogout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log("function not run");
     
    }
    return res.redirect("/");
  });
});



module.exports = routes;