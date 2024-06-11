import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'
import axios from 'axios'


const SignUp = () => {
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
      <div className={`container active `} id="container">
      <ToastContainer />
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" name='name' required />
            <input type="number" placeholder="Phone" name='phone' required />
            <input type="email" placeholder="Email" name='email' required />
            <input type="password" placeholder="Password" name='password' required />
            <input type="password" placeholder="Confirm password" name='confirmPassword' required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type='submit'>Sign Up</button>
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

export default SignUp
