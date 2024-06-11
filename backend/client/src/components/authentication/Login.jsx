import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'
import axios from 'axios'


const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const phone= formData.get('phone');
    const data = {
      name: formData.get('name'),
      phone:'+'+phone,
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    const confirmPassword = formData.get('confirmPassword');
    console.log("pas",confirmPassword)

    if (data.password !== confirmPassword) {
      setError('Passwords do not match');
      console.log('Passwords do not match')
      return;
    }else{
      setError('');
      localStorage.setItem('phone', JSON.stringify(data.phone));
      
    }


    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', data);
      console.log('Response:', response.data);
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
    } catch (error) {
      console.error(error);
      toast.error('User Already Exists'+error, {
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
    <div className=' '>
      <div className=' w-[768px] relative max-w-[100%] min-h-[480px] bg-white shadow-2xl overflow-hidden '>
      <ToastContainer />
        <div className="absolute top-0 h-[100%] w-[50%] translate-x-full">
          <form onSubmit={handleSubmit} className='flex align-middle h-[100%] px-[40px] content-center justify-center flex-col '>
            <h1>Sign In</h1>
            <span>or use your email for registeration</span>
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[100%] outline-transparent' type="number" placeholder="Phone" name='phone' required />
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[100%] outline-transparent' type="password" placeholder="Password" name='password' required />
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[100%] outline-transparent' type="password" placeholder="Confirm password" name='confirmPassword' required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className=' bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-xs py-2.5 px-10 font-bold uppercase cursor-pointer mt-5' type='submit'>Sign Up</button>
          </form>
        </div>
        
        <div className="absolute top-0 left-[0%] w-[50%] h-[100%] overflow-hidden z-10">
          <div className=" bg-blue-500 h-[100%] bg-gradient-to-r text-white relative  w-[200%]">
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
