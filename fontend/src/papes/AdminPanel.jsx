import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { BiExit } from "react-icons/bi";



const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])


  return (
    <div className='min-h-[calc(117.3vh-120px)] lg:flex hidden '>
        <aside className='bg-lime-400 min-h-full  w-full  max-w-64 shadow-md  '>
                <div className='h-32  flex justify-center items-center flex-col mt-16 '>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4 mt-4 pb-4'> 
                        <Link to={"dashboard"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <LuLayoutDashboard className='mr-3'/>Dashboard</Link>                   
                        <Link to={"all-users"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <LuUsers className='mr-3'/>Customer</Link>
                        <Link to={"all-products"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-2 transition-all duration-300 ease-in-out relative'> <BsBoxSeam className='mr-3'/>Products</Link>
                        <Link to={""} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <FiTruck className='mr-3'/>Order</Link>
                        <Link to={"/"} className='flex items-center px-10 py-1 mt-10 hover:text-gray-200  hover:ml-3 transition-all duration-300 ease-in-out relative'> <BiExit className='text-3xl mt-8' /></Link>
                            
                    </nav>
                </div> 
        </aside>

        <main className='w-full h-full p-2'>
            <ToastContainer
                position='top-center' />
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel