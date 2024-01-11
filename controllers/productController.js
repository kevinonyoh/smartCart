import ErrorHandler from "../utils/ErrorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import * as productService from "../services/productService.js";
import * as userService from "../services/userService.js";
import * as adminService from "../services/adminService.js"

export const postProduct = async(req, res, next) => {
    try {
        
        let productValue = req.body;
        let data = productValue["data"];
        let phoneNumber = data.shift();
        let total = Number(data.pop());

        let result = {};
        data.forEach(element => {
            result[element] = (result[element] || 0) + 1;
        });

        const user = await userService.findUser(phoneNumber);

        let {amount, ...rest} = user;

         amount = Number(amount);

        

        if(!data) throw new ErrorHandler(400, "no product sent");

        if(!user) throw new ErrorHandler(400, "user not found");

        if(total > amount) throw new ErrorHandler(400, "insufficient balance");
         
        let balance = amount - total; 
        let value = {
            phoneNumber,
            "amount": total,
            "product": result
        }

        await productService.saveProduct(value);
        await userService.updateAmount(phoneNumber, balance);
        let admin = await adminService.findAdmin("08074845712");

        let adminTotal = total+Number(admin["amount"]);

        await adminService.updateAmount("08074845712", adminTotal);

        responseHandler(res, null, "transaction successfully");

    } catch (err) {
        next(err);
    }
}

export const getProduct = async(req, res, next) => {
    try {
       const {name} = req.query;

        const data = await productService.findProduct(name);
        responseHandler(res, data, "product details");
    } catch (err) {
        next(err);
    }
}