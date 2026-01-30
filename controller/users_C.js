const {getAll,getOne,remove,update,getCategoriesByUser,removeAllCategoriesByUser,removeAllTasksByUser} = require('../model/users_M.js');
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
        let userId = req.id;
        let categories = await getCategoriesByUser(userId);
        
        if(categories.length > 0){
            return res.status(200).json({
                hasCategories: true,
                categoriesCount: categories.length,
                message: `This user has ${categories.length} categor(ies). Confirm deletion to remove user and all its categories.`
            });
        }
        
        let affectedRows = await remove(userId);
        if(!affectedRows){
            return res.status(400).json({message:`user ${userId} not exist`})
        }
        res.status(200).json({message:"The user is deleted!"});
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

async function updateUser(req,res) {
     try{
        let affectedRows = await update(req.id,req.user);
        if(!affectedRows){
            return res.status(400).json({message:`user ${req.id} not exist`})
        }
        res.status(200).json({message:"The user is Updated!"});
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

async function deleteUserWithCategories(req,res) {
    try{
        let userId = req.id;
        await removeAllTasksByUser(userId);
        await removeAllCategoriesByUser(userId);
        let affectedRows = await remove(userId);
        
        if(!affectedRows){
            return res.status(400).json({message:`user ${userId} not exist`})
        }
        res.status(200).json({message:"The user and all categories are deleted!"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"})
    }
}

module.exports = {
    getAllUsers,getOneUser,deleteUser,updateUser,deleteUserWithCategories
}