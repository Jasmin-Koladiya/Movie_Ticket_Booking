const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")

var routes = express.Router();
var movieController = require("../controller/movieController");
routes.get("/", movieController.user);
routes.get("/add_movie",passport.checkAuthentication, movieController.add_movie);
routes.post("/addMovieData",passport.checkAuthentication,movieController.addMovieData)
routes.get("/view_movie",passport.checkAuthentication, movieController.view_movie);
routes.get("/viewMovieDetail/:id", movieController.viewMovieDetail);

routes.post("/addcartdata",passport.checkAuthenticationuser,movieController.addcartdata)
routes.get("/view_cart",passport.checkAuthenticationuser,movieController.view_Cart)
routes.get('/deactivestatus/:id',passport.checkAuthentication,movieController.deactivestatus)
routes.get('/activestatus/:id',passport.checkAuthentication,movieController.activestatus)
routes.get("/delete_movie/:id",passport.checkAuthentication, movieController.delete_movie);
routes.get(  "/updateData/:id",passport.checkAuthentication,movieController.updateData);
routes.post("/editData",passport.checkAuthentication,movieController.editData);
routes.get("/bookShow/:id",passport.checkAuthenticationuser,movieController.bookShow);
routes.post('/findShowdata',passport.checkAuthenticationuser, movieController.findShowdata);
routes.post("/pricedata",passport.checkAuthenticationuser,movieController.pricedata)
routes.post("/tiketdata",passport.checkAuthenticationuser,movieController.tiketdata)

module.exports = routes;
