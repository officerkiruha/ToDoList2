const bcrypt = require('bcrypt');

function valuesToAdd(req,res,next){
    let {name,email,userName,pass} = req.body;
    if(!name || !email || !userName || !pass){
        return res.status(400).json({message:"No data"});
    }
    next();
}

async function encrypPass(req,res,next){

    let pass = req.body.pass;
    let hashPass = await bcrypt.hash(pass,10);
    req.pass = hashPass;


}

module.exports = {
    valuesToAdd,
    encrypPass,

}