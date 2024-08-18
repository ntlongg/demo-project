import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../papes/Login";
import Signup from "../papes/Signup";
import AdminPanel from "../papes/AdminPanel";
import AllProducts from "../papes/AllProducts";
import AllUsers from "../papes/AllUsers";
import Home from "../papes/Home";
import CategoryProduct from "../papes/CategoryProduct";
import Dashboard from "../component/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/> ,
        children : 
        [   
            {
                path :"",
                element :<Home/>
            },
            {
                path :"login",
                element :<Login/>
            },
            {
                path :"signup",
                element :<Signup/>
            },
            {
                path:"product-category/:categoryName",
                element:<CategoryProduct/>
            } 
        ]
        
    },
    {
        path :"/admin-panel",
        element :<AdminPanel/>,
        children : [
            {
                path : "all-users",
                element : <AllUsers/>
            },
            {
                path : "all-products",
                element : <AllProducts/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>
            }
        ]
    }
]);

export default router;