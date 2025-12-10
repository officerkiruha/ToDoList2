function valuesToAdd(req,res,next){
    let name = req.body.name;
    if(!name){
        return res.status(400).json({message:"No data"});
    }
    next();
}

module.exports = {
    valuesToAdd,
   
};