import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from "react-phone-input-2";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'


const LoginPage = () => {
  const [phone,setPhone]= useState('')
  const { login } = useAuth();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      phone:'+'+phone,
      password: formData.get('password'),
    };
    
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', data);
      console.log('Response:', response.data);
      toast.success(response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        localStorage.setItem('phone', JSON.stringify(data.phone));
        setRedirect(true);
        login();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/verify'); 
    }
  }, [redirect, navigate]);


  return (
    <div className=''>
      <div className='w-[300px] sm:w-[668px] lg:w-[768px]   relative max-w-[100%] sm:min-h-[480px] min-h-[380px] bg-white shadow-2xl overflow-hidden' id="container">
      <ToastContainer />
        <div className="absolute top-0 h-[100%] w-[0%] sm:w-[50%] translate-x-full">
          <form onSubmit={handleSubmit} className='flex align-middle h-[100%] px-[40px] content-center justify-center flex-col'>
            <h1 className='w-[200px] translate-x-[50%] sm:translate-x-0 text-center text-lg font-semibold self-center'>Login Account</h1>
            <span className='text-center w-[300px] sm:translate-x-0 mb-4 self-center translate-x-[37%]'>or use your email for registeration</span>
            <PhoneInput country={"in"} value={phone} onChange={setPhone} placeholder='Phone' specialLabel=''/>
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="password" placeholder="Password" name='password' required />
            <button  className=' sm:self-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[12px] w-[220px]  py-4 px-10 font-bold uppercase cursor-pointer mt-5' type='submit'>Send OTP</button>
            <p className='absolute  w-[300px] sm:w-[100%] bottom-6 right-[-300px]  sm:right-1 text-center'>Don't have an account? <a href="/register" className='underline hover:text-blue-800 text-blue-500'>Register</a></p>
          </form>
        </div>
        
        <div className="absolute top-0 left-[0%] w-[50%] h-[100%] overflow-hidden z-10 hidden sm:block">
          <div className="bg-blue-500 h-[100%] bg-gradient-to-r text-white relative  w-[200%]">
            <div className="flex absolute w-[50%] h-[100%] align-middle justify-center flex-col py-0 px-[30px] text-center top-0  transition-all">
              <h1>Hello, Friend!</h1>
              <p className='text-md my-[20px]'>Register with your personal details to use all of site features</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
