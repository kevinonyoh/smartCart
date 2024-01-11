import user from "../model/userSchema.js";

export const saveUser = async(data) => {
   try {
    
    const newUser = new user(data);
    await newUser.save();
   

   } catch (error) {
    throw new Error(error)
   }
}

export const findUser = async(data) => {
    try {
        
        const {$__, $isNew, _doc} = await user.findOne({phoneNumber: data});

        return _doc;

    } catch (err) {
        throw new Error(err);
    }
}

export const updateAmount = async(valKey, data) => {
    try {
        
        let  filter= {"phoneNumber": valKey};
        let update = {"amount": data};
        await user.findOneAndUpdate(filter, update);

    } catch(err){
        throw new Error(err);
    }
}