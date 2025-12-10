function isValidId(req,res,next) {
    let id = parseInt(req.params.id);
    if(isNaN(id) || id <= 0 ){
        res.status(400).json({message:"ID is not exist"});
    }
    req.id = id;
    next();
}

module.exports = {
    isValidId
};