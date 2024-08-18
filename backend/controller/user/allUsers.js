const useModel = require("../../models/userModels");

async function allUsers(req,res){
    try{
        console.log("useId",req.userId)

        const allUsers = await useModel.find()

        res.json({
            message : "All user details",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
          });
    }
}

module.exports = allUsers