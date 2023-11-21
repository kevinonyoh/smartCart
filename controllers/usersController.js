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

        }else if(!password || !phoneNumber){
            throw new ErrorHandler(400, "All required fields must not be empty");
        }else{
            
             password = await bcrypt.hashSync(password, 10);
            console.log(password);
            const data = {email,password,phoneNumber};
            await userServices.saveUser(data);

            responseHandler(res, null, "sign up successful, your payment password for your smartcart card is your password");
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
         
        responseHandler(res, rest, "sign up successful, your payment password for your smartcart card is your password");

    } catch (err) {
        next(err);
    }
}


