


const backendDomin = "http://localhost:7203"

const SummaryApi = {
    signUP :{
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIN : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/user-logout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : "get"
    },
    updateProduct : {
       url : `${backendDomin}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomin}/api/getcategory-product`,
        method : "get"
    },
    deleteUser : {
        url : `${backendDomin}/api/delete-user`,
        method : "delete"
    },
    deleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method : "delete"
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : "post"
    }
    
}

export default SummaryApi