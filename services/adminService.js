import admin from "../model/adminSchema.js";

export const saveAdmin = async(data) => {
   try {
    
    const newUser = new admin(data);
    await newUser.save();
   

   } catch (error) {
    throw new Error(error)
   }
}

export const findAdmin = async(data) => {
    try {
        
        const {$__, $isNew, _doc} = await admin.findOne({phoneNumber: data});

        return _doc;

    } catch (err) {
        throw new Error(err);
    }
}

export const updateAmount = async(phoneNumber, amount) => {
    try {
        await admin.updateOne({"phoneNumber": phoneNumber}, {"amount": amount})
    } catch(err){
        throw new Error(err);
    }
}