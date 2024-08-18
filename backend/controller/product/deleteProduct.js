const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function deleteProductController(req,res){
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body
        const deleteProduct = await productModel.findByIdAndDelete(_id,resBody)
        res.json({
            message : "Sản phẩm đã được xoá",
            data : deleteProduct,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = deleteProductController