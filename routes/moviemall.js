const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")

var routes = express.Router();
var movieMallController = require("../controller/moviemallController");

routes.get("/add_movie_mall",passport.checkAuthentication, movieMallController.add_movie_mall);
routes.get("/view_movie_mall",passport.checkAuthentication, movieMallController.view_movie_mall);
routes.post("/addmoviemalldata",passport.checkAuthentication,movieMallController.addmoviemalldata)
routes.get("/delete_moviemall/:id",passport.checkAuthentication, movieMallController.delete_moviemall);
module.exports = routes;
