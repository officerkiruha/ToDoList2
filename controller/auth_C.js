const {addUser,getByUserName,getByEmail} = require('../model/users_M')
async function register(req,res) {
    try{
        let name = req.body.name;
        let email = req.body.email;
        let userName = req.body.userName;
        let pass = req.pass;
        let user = await getByUserName(userName);
        if(user){
            return res.status(409).json({message:"user is already exist"})
        }
        user = await getByEmail(email);
        if(user){
            return res.status(409).json({message:"email is already exist"})
        }

        let userID = await addUser({name,email,userName,pass});
        if(!userID){
            res.status(500).json({message:"Server Error"});
        }
        res.status(201).json({message:"Welcome to the new World"})
    }catch(err){
        console.error(err);
        
        res.status(500).json({message:"Server Error"});

    }
    
}
module.exports = {
    register,
}