import bcrypt from "bcrypt";
import _ from "lodash";
import ErrorHandler from "../utils/ErrorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import {checkEmail} from "../utils/validChecker.js";
import * as userServices from "../services/userService.js";


export const postUserDetails = async(req, res, next) => {
    try {
        let {email, password, phoneNumber} = req.body;
        if(!checkEmail(email)){
            
            throw new ErrorHandler(400, "Invalid email address");

        }else if(!password || !phoneNumber ){
            throw new ErrorHandler(400, "All required fields must not be empty");
        }else{
            
             password = await bcrypt.hashSync(password, 10);
            console.log(password);
            const data = {email,password,phoneNumber};
            await userServices.saveUser(data);

          res.redirect('/wallet');
        }

    } catch (err) {
        next(err);
    }
}



export const postLogin = async(req, res, next) => {
    try {
        
        let inputPassword = req.body.password;
        const {phoneNumber} = req.body;
        const {password, ...rest} = await userServices.findUser(phoneNumber);
       
        const match = await bcrypt.compare(inputPassword, password);  
        if (match) {
            res.redirect(`/wallet?phoneNumber=${phoneNumber}`);
        } else {
            res.redirect('/login');
        }
       
    } catch (err) {
        next(err);
    }
}

export const getLogin = async(req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        next(err);
    }
}

export const getSignUp = async(req, res, next) => {
    try {
        res.render('signup');
    } catch (err) {
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    try {
        
        res.render('wallet');
    } catch (err) {
        next(err)
    }
}


export const postamount = async (req, res, next) => {
    try {
        const {phoneNumber, amount} = req.body;
        
        const user = await userServices.findUser(phoneNumber);
        
        let total = Number(amount) + Number(user["amount"]);

        await userServices.updateAmount(phoneNumber, total);

        res.redirect(`/wallet?phoneNumber=${phoneNumber}`);

    } catch (err) {
        next(err)
    }
}
