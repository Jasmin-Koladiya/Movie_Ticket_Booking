const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const app = express();
const path = require("path");
app.use(express.static('assets'));

var routes = express.Router();
var AdminController = require("../controller/adminController");
routes.post("/creatsession", passport.authenticate('admin',{failureRedirect :'/login'}), AdminController.dashbordsession  );
routes.get("/", AdminController.  admin);
routes.get("/dashboard",passport.checkAuthentication,AdminController.dashboard)
routes.get("/add_admin",passport.checkAuthentication,AdminController.add_admin);
routes.post("/addUserData",passport.checkAuthentication,AdminController.addUserData);
routes.get("/view_admin",passport.checkAuthentication,AdminController.view_admin);
routes.get("/login", AdminController.login);
routes.get("/admin_lostpass",function(req, res){
    return res.render('admin_lostpass')
  })
  routes.post("/checkmaile",AdminController.checkmaile)
  routes.post('/verifyotp', AdminController.verifyotp);
  routes.post('/resetpassword', AdminController.resetpassword);
routes.get("/profile/:id",passport.checkAuthentication,AdminController.profile)
routes.post("/edite_profile",passport.checkAuthentication,AdminController.edite_profile)
routes.get( "/updatepassword",passport.checkAuthentication,AdminController.updatepassword)
routes.post("/changepass",passport.checkAuthentication,AdminController.changepass)
routes.get('/delete_user/:id',passport.checkAuthentication,AdminController.delete_user)

routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log("function not run");
     
    }
    return res.redirect("/login");
  });
});
routes.get("/register", AdminController.registration);
routes.post("/registerdata", AdminController.register);
routes.get(  "/updateData/:id",passport.checkAuthentication,AdminController.updateData);
routes.post("/editData",passport.checkAuthentication,AdminController.editData);
module.exports = routes;