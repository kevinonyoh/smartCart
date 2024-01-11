import product from "../model/productSchema.js";

export const saveProduct = async(data) =>{
    try {
        const newProduct = new product(data);
        newProduct.save();
    } catch (err) {
        throw new Error(err);
    }
}


export const findProduct = async(name) => {
    try {
        
        const {$__, $isNew, _doc} = await product.findOne({name});
        return _doc;

    } catch (err) {
        throw new Error(err);
    }
}