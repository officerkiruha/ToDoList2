const {getAll,getOne,remove} = require('../model/users_M.js');
async function getAllUsers(req,res) {
try{
    let users = await getAll();
    if(users.length == 0 ){
        return res.status(400).json({message:"No Data"});
    }
   res.status(200).json(users);
}catch(err){
    res.status(500).json({message:"err"});
} 
}

async function getOneUser(req,res) {
    try{
        let user = await getOne(req.id);
        if(!user){
            return res.status(400).json({message:`user ${req.id} not exist`})
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Server Error"})
    } 
}

 async function deleteUser(req,res) {
      try{
        let user = await remove(req.id);
        if(!user){
            return res.status(400).json({message:`user ${req.id} not exist`})
        }
        res.status(200).json({message:"The user is deleted!"});
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}
module.exports = {
    getAllUsers,getOneUser,deleteUser,
}