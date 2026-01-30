const {addUser,getByUserName,getByEmail} = require('../model/users_M');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            return res.status(500).json({message:"Server Error"});
        }
        res.status(201).json({message:"Welcome to the new World"})
    }catch(err){
        console.error(err);
        
        res.status(500).json({message:"Server Error"});

    }
    
}

async function login(req,res,next) {
try{
let user = await getByUserName(req.body.userName);
if(!user){
    return res.status(400).json({message:"username or password are wrong"});
}
let isMatch = await bcrypt.compare(req.body.pass, user.pass);
if(!isMatch){
return res.status(400).json({message:"username or password are wrong"});
}
req.user = user;
next();
}catch(err){
    console.error(err);
    res.status(500).json({message:"Server Error"});
}
}
function createJwt(req,res){
    try{
        let user = req.user;
        let token = jwt.sign(
            {
                id:user.id,
                name:user.name,
            },
            process.env.SECRET_KEY,
            {expiresIn:'3h'}
        );
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*3}).status(200).json({message:"Login successful",name:user.name});
       // console.log(token);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}
module.exports = {
    register,
    login,
    createJwt
}