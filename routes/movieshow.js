const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")

var routes = express.Router();
var movieShowController = require("../controller/movieshowController");

routes.get("/add_movieshow_mall",passport.checkAuthentication, movieShowController.add_movieshow_mall);
routes.get("/view_movieshow_mall",passport.checkAuthentication, movieShowController.view_movieshow_mall);
routes.post("/addmovieshowdata",passport.checkAuthentication,movieShowController.addmovieshowdata)
routes.post('/get_mall',passport.checkAuthentication, movieShowController.getMall);
routes.get("/delete_movieshow/:id",passport.checkAuthentication, movieShowController.delete_movieshow);

module.exports = routes;
