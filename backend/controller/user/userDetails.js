const useModel = require("../../models/userModels")


async function userDetailsController(req,res){
    try{
        
        const user = await useModel.findById(req.userId)
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "Chi tiết người dùng "
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController