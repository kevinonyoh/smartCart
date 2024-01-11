import mongoose from "../config/smartCartDB.js";


const productSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            trim: true,
            required: true
        },
        amount: {
            type: Number,
            trim: true,
            required: true
        },
        product: {
            type: Object,
            trim: true,
            required: true
        }
        })
    
    const product = new mongoose.model("product", productSchema);
    
    export default product;