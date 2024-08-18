import logo from "../assets/image/logo4.png"
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const[menuDisplay,setMenuDisplay] = useState(false)
  const handlLogout = async () =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  return (
    <nav>
      <div className='fixed z-20 w-full bg-lime-400 shadow-md'>
        <div className='h-full container  flex items-center px-4 justify-between  '>
          <a href="/" className='w-24 h-24 '>
            <img className="p-1" src={logo} alt="l"/>
          </a>
          <div className='flex items-center  w-full max-w-sm border rounded-full border-black '>
            <input type="text" placeholder="Nhập thứ bạn tìm .." className=' ml-2 w-full outline-none pl-50 items-center bg-lime-400 placeholder-black' />
            <button className=' focus:outline-none text-lg min-w-[50px] h-7 bg-green-600 flex items-center justify-center rounded-r-full hover:text-white'>
              <CiSearch />
            </button>
          </div>
          <div className='flex items-center  gap-14 '>
            <div className=" relative group flex justify-center">
              {
                user?._id && (
                  <div className='text-4xl cursor-pointer flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                {
                  user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full " />
                  ) : (
                  <MdAccountCircle />
                      )
              }
              </div>

                )
              }
              
              {
                menuDisplay &&(
                  <div className=" absolute bg-white bottom-0 top-16 h-fit shadow-xl rounded">
                    <nav>
                      {
                        user?.role === ROLE.ADMIN &&  (
                          <Link to={"admin-panel"} className=" whitespace-nowrap  md:block bg-black text-white hover:bg-green-600 hover:text-black p-2" onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }
              
            </div>

            <div className='text-4xl relative cursor-pointer'>
              <span className=""><FaShoppingCart /></span>
              <div className=' bg-white w-5 h-5 rounded-full p-1 flex items-center absolute -top-2 -right-3'>
                <p className='text-sm'>4</p>
              </div>
            </div>
            <div>
              {
                user?._id?(
                  <button onClick={handlLogout} className="py-1 px-2 border rounded-full border-black hover:bg-green-600 hover:text-black mr-10 ">Đăng xuất</button>
                )
                : (
                  <Link to={"/login"} className="btn py-1 px-2 rounded-full bg-black text-white hover:bg-green-600 hover:text-black mr-10 ">Đăng Nhập</Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;