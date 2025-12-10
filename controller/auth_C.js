//const {addUser} = require('../model/users_M')
async function addUser(req,res) {
    try{


    }catch(err){
        res.status(500).json({message:"Server Error"});

    }
    
}
module.exports = {
    addUser,
}