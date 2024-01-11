
import mongoose from "../config/smartCartDB.js";



const adminSchema = new mongoose.Schema(
{
    email: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        trim: true,
        default: 0  
    } 
})

const admin = new mongoose.model("admin", adminSchema);

export default admin;