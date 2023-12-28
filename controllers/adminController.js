import bcrypt from "bcrypt";
import _ from "lodash";
import ErrorHandler from "../utils/ErrorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import {checkEmail} from "../utils/validChecker.js";
import * as adminService from "../services/adminService.js";


export const postAdminDetails = async(req, res, next) => {
    try {
        let {email, password, phoneNumber, username} = req.body;
        if(!checkEmail(email)){
            
            throw new ErrorHandler(400, "Invalid email address");

        }else if(!password || !phoneNumber || !username){
            throw new ErrorHandler(400, "All required fields must not be empty");
        }else{
            
             password = await bcrypt.hashSync(password, 10);
            console.log(password);
            const data = {email,password,phoneNumber, username};
            await adminService.saveAdmin(data);

          res.redirect('/admin-dashboard');
        }
        

    } catch (err) {
        next(err);
    }
}

export const postLogin = async(req, res, next) => {
    try {
        
        let inputPassword = req.body.password;
        const {phoneNumber} = req.body;
        const {password, ...rest} = await adminService.findAdmin(phoneNumber);
       
        const match = await bcrypt.compare(inputPassword, password);  
        if (match) {
            res.redirect(`/admin-dashboard?phoneNumber=${phoneNumber}`);
        } else {
            res.redirect('/admin-login');
        }
       
    } catch (err) {
        next(err);
    }
}

export const getSignUp = async(req, res, next) => {
    try {
        res.render('adminSignUp');
    } catch (err) {
        next(err);
    }
}

export const getLogin = async(req, res, next) => {
    try {
        res.render('adminLogin');
    } catch (err) {
        next(err);
    }
}


export const getAdmin = async(req, res, next) => {
    try {
        
        res.render('adminDashBoard');

    } catch (err) {
        next(err)
    }
}



