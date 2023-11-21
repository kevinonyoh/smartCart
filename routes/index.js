import express from "express";
import * as usersController from "../controllers/usersController.js";
import * as productController from "../controllers/productController.js";

const Router = express.Router();

Router.route( "/sign-up" )
.post(usersController.postUserDetails);

Router.route("/login")
.post(usersController.postLogin);




Router.route("/product")
.post(productController.postProduct)
.get(productController.getProduct);

export default Router;