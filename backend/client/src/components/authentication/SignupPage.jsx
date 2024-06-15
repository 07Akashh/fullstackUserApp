import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import PhoneInput from 'react-phone-input-2';


const SignUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const { register } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      phone: '+' + phone,
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const confirmPassword = formData.get('confirmPassword');
    console.log("pas", confirmPassword)

    if (data.password !== confirmPassword) {
      setError('Passwords do not match');
      console.log('Passwords do not match')
      return;
    } else {
      setError('');
      localStorage.setItem('phone', JSON.stringify(data.phone));

    }


    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', data);
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
      register();
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
      <div className='w-[300px] sm:w-[668px] lg:w-[768px]   relative max-w-[100%] sm:min-h-[560px] min-h-[560px] bg-white shadow-2xl overflow-hidden' id="container">
        <ToastContainer />
        <div className="absolute top-0 h-[100%] w-[0%] sm:w-[50%] translate-x-full">
          <form onSubmit={handleSubmit} className='flex align-middle h-[100%] px-[40px] content-center justify-center flex-col'>
            <h1 className='w-[200px] translate-x-[50%] sm:translate-x-0 text-center text-lg font-semibold self-center'>Create Account</h1>
            <span className='text-center w-[300px] sm:translate-x-0 self-center translate-x-[37%]'>or use your email for registeration</span>
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] mt-5 w-[220px] sm:w-[100%] outline-transparent' type="text" placeholder="Name" name='name' required />
            <PhoneInput country={"in"} value={phone} onChange={setPhone} placeholder='Phone' specialLabel='' />
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="email" placeholder="Email" name='email' required />
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="password" placeholder="Password" name='password' required />
            <input className=' bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="password" placeholder="Confirm password" name='confirmPassword' required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className=' sm:self-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[12px] w-[220px]  py-4 px-10 font-bold uppercase cursor-pointer mt-5' type='submit'>Sign Up</button>
            <p className='absolute  w-[300px] sm:w-[100%] bottom-6 right-[-300px]  sm:right-1 text-center'>Already have an account? <a href="/login" className='underline hover:text-blue-800 text-blue-500'>Login</a></p>
          </form>
        </div>

        <div className="absolute top-0  left-[0%] w-[50%] h-[100%] overflow-hidden z-10 hidden sm:block">
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

export default SignUp
