const express = require('express')

const router = express.Router()


const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const updateUser = require('../controller/user/UpdateUser')
const allUsers = require('../controller/user/Allusers')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProduct')
const deleteUser = require('../controller/user/userDelete')
const deleteProductController = require('../controller/product/deleteProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')



//user
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/user-logout",userLogout)
router.delete("/delete-user",authToken,deleteUser)
//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/getcategory-product",getCategoryProduct)
router.delete("/delete-product",authToken,deleteProductController)
router.post("/category-product",getCategoryWiseProduct)

module.exports = router