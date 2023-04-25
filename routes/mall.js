const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")

var routes = express.Router();
var MallController = require("../controller/mallController");

routes.get("/add_mall",passport.checkAuthentication, MallController.add_mall);
routes.get("/view_mall",passport.checkAuthentication, MallController.view_mall);
routes.post("/addmallData",passport.checkAuthentication,MallController.addmallData)
routes.get("/delete_mall/:id",passport.checkAuthentication, MallController.delete_mall);
routes.get(  "/updateData/:id",passport.checkAuthentication,MallController.updateData);
routes.post("/editData",passport.checkAuthentication,MallController.editData);
module.exports = routes;
