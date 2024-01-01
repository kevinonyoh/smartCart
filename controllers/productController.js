import ErrorHandler from "../utils/ErrorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import * as productService from "../services/productService.js";

export const postProduct = async(req, res, next) => {
    try {
        
        const productValue = req.body;
        const data = productValue["data"];

        

        if(!data){
           throw new ErrorHandler(400, "no product sent");
        } else {
            
            responseHandler(res, null, "transaction successfully");
        }

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