import ErrorHandler from "../utils/ErrorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import * as productService from "../services/productService.js";

export const postProduct = async(req, res, next) => {
    try {
        const {name, price} = req.body;

        if(!name || !price){
            throw new ErrorHandler(400, "All required fields must not be empty");
        } else {
            const data = {name, price};
            await productService.saveProduct(data);
            responseHandler(res, null, "product saved successfully");
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