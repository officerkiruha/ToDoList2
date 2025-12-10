const {getAll,add} = require('../model/categories_M');
async function getAllCategories(req,res) {
try{
    let categories = await getAll();
    if(categories.length == 0 ){
        return res.status(400).json({message:"No Data"});
    }
   res.status(200).json(categories);
}catch(err){
    res.status(500).json({message:"err"});
} 
}
async function addCategory(req,res) {
    try{
        let name = req.body.name;
        let userId = req.user.id;
        let categoryIdID = await add({name,userId});
        if(!categoryIdID){
            res.status(500).json({message:"Server Error"});
        }
        res.status(201).json({message:"added!"})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});

    }
    
}

module.exports = {
    getAllCategories,addCategory,
}