import React, { useState } from 'react';
import logosignup from "../assets/image/logosignup.gif";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from '../helpers/imageToabse64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleUploadPic = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      console.log("imagePic", imagePic);
      setData(prevData => ({
        ...prevData,
        profilePic: imagePic 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (data.password === data.confirmPassword) {
      const response = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }

      console.log('User', responseData);
    } else {
      toast.error('Mật khẩu không trùng khớp');
      console.log('Passwords do not match');
    }
  };
  
  return (
    <section id='Signup'>
      <div className='mx-auto container mt-20 '>
        <div className='bg-lime-500 shadow-2xl p-3 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-xl'>
            <div>
              <img src={data.profilePic || logosignup} alt='logosignup' />
            </div>
            <form>
              <label>
                <div className='text-sm text-center bg-opacity-50 cursor-pointer py-2 bg-slate-200 absolute bottom-0 w-full'>Tải ảnh lên</div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='' onSubmit={handleSubmit}>
            <div>
              <label>Tên của bạn:</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms'>
                <input
                  type='text'
                  placeholder='Nhập tên của bạn..'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='ml-3 w-80 outline-none pl-50 items-center'
                />
              </div>
            </div>

            <div className='grid'>
              <label>Email:</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms'>
                <input
                  type='email'
                  placeholder='Vui lòng nhập Email..'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='ml-3 w-80 outline-none pl-50 items-center'
                />
              </div>
            </div>
            <div>
              <label>Mật khẩu:</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms mb-2'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Vui lòng nhập Mật khẩu..'
                  onChange={handleOnChange}
                  required
                  name='password'
                  value={data.password}
                  className='ml-3 w-80 outline-none pl-50 items-center mr-2'
                />
                <div className='text-xl cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                  <span>
                    {showPassword ? (
                      <IoIosEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Nhập lại mật khẩu:</label>
              <div className='flex items-center w-full max-w-sm focus-within:shadow-ms mb-2'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Vui lòng nhập lại mật khẩu..'
                  onChange={handleOnChange}
                  required
                  name='confirmPassword'
                  value={data.confirmPassword}
                  className='ml-3 w-80 outline-none pl-50 items-center mr-2'
                />
                <div className='text-xl cursor-pointer' onClick={() => setShowConfirmPassword(prev => !prev)}>
                  <span>
                    {showConfirmPassword ? (
                      <IoIosEye/>
                    ) : (
                      <FaEyeSlash/>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className='bg-black text-white hover:bg-green-600 hover:text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Đăng ký</button>
            </div>
          </form>
          <p className='my-5'>Quay trở lại đăng nhập? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Đăng nhập</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Signup;