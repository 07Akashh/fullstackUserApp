import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'
import axios from 'axios'

const AuthPages = () => {



  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

let phone=localStorage.getItem('phone')

phone = phone.replace(/["\\]/g, '').toString();
 
  const handleSubmit = async (e) => {

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      code: formData.get('otp'),
      phone:phone,
    };
    console.log(data)
    try {
      const response = await axios.post('http://localhost:3002/api/auth/verify',data );
      console.log('Response:', response.data);
      localStorage.setItem('token',JSON.stringify(response.data))
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
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/home'); 
    }
  }, [redirect, navigate]);

  return (
    <div className=' '>
      <div className={`container active `} id="container">
      <ToastContainer />
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="number" placeholder="Otp" name='otp' required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button  className=' bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-xs py-2.5 px-5 font-bold uppercase cursor-pointer mt-5' type='submit'>Verify Otp</button>
          </form>
        </div>
        
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default AuthPages
