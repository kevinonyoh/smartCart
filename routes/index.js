import express from "express";
import * as usersController from "../controllers/usersController.js";
import * as productController from "../controllers/productController.js";
import * as adminController from "../controllers/adminController.js";

const Router = express.Router();



Router.route( "/sign-up" )
.post(usersController.postUserDetails)
.get(usersController.getSignUp);

Router.route("/login")
.post(usersController.postLogin)
.get(usersController.getLogin);

Router.route("/wallet")
.get(usersController.getUser);


Router.route("/product")
.post(productController.postProduct)
.get(productController.getProduct);


Router.route("/admin-dashboard")
.get(adminController.getAdmin);

Router.route("/admin-signUp")
.get(adminController.getSignUp)
.post(adminController.postAdminDetails);

Router.route("/admin-login")
.get(adminController.getLogin)
.post(adminController.postLogin);


export default Router;