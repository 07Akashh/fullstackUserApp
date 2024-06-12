import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import OTPInput from "otp-input-react";
import { useAuth } from '../../security/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

const AuthPages = () => {
  const [OTP, setOTP] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { verify } = useAuth();
  const navigate = useNavigate();

  let phone = localStorage.getItem('phone')
  console.log(OTP)

  if (phone) {
    phone = phone.replace(/["\\]/g, '').toString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      code: OTP,
      phone: phone,
    };
    console.log(data)
    try {
      const response = await axios.post('http://localhost:3002/api/auth/verify', data);
      console.log('Response:', response.data);
      localStorage.setItem('token', JSON.stringify(response.data))
      toast.success(response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setRedirect(true);
      verify()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
  }, [redirect, navigate]);

  return (
    <div className=''>
      <div className='w-[300px] sm:w-[668px] lg:w-[768px] relative max-w-[100%] sm:min-h-[480px] min-h-[300px] bg-white shadow-2xl overflow-hidden' id="container">
        <ToastContainer />
        <div className="absolute top-0 h-[100%] w-[0%] sm:w-[50%] translate-x-full">
          <form onSubmit={handleSubmit} className='flex align-middle h-[100%] px-[40px] content-center justify-center flex-col'>
            <h1 className='w-[200px] translate-x-[50%] sm:translate-x-0 text-center text-lg font-semibold self-center'>Verify Phone</h1>
            <span className='text-center w-[300px] sm:translate-x-0 self-center translate-x-[37%]'>or use your email for registration</span>
            <OTPInput value={OTP} className=' my-8 opt-container' onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
            <button className=' sm:self-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[12px] w-[220px]  py-4 px-10 font-bold uppercase cursor-pointer mt-5' type='submit'>Verify Otp</button>
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

export default AuthPages
