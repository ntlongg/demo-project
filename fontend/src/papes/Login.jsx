import React, { useState, useContext } from 'react';
import logologin from "../assets/image/logologin.gif";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AppContext from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(AppContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.signIN.url, {
        method: SummaryApi.signIN.method,
        credentials: "include",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        fetchUserDetails();
        navigate('/');
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình đăng nhập.");
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container mt-20'>
        <div className='bg-lime-500 p-3 w-full max-w-sm mx-auto rounded-sm shadow-2xl'>
          <div className='w-20 h-20 mx-auto rounded-full bg-red-100'>
            <img src={logologin} alt='login icon' />
          </div>

          <form className='' onSubmit={handleSubmit}>
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
                  type={showPassword ? "text"  : "password"}
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
                      <IoIosEye/>
                    ) : (
                      <FaEyeSlash/>
                    )}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-white'>Bạn quên mật khẩu?</Link>
            </div>

            <div>
              <button
                type='submit'
                className='bg-black text-white hover:bg-green-600 hover:text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <p className='my-5'>Bạn chưa có tài khoản? <Link to={"/signup"} className='text-red-600 hover:text-red-700 hover:underline'>Đăng ký</Link> </p>
        </div>
      </div>
    </section>
  );
};

export default Login;