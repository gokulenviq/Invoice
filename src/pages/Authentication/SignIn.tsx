import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests


import 'tailwindcss/tailwind.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from "../../Image/Enviq-Tech-solution-Logo-white.png";
import backgroundImage from "../../Image/BG.jpg"; 

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });

  const [loginError, setLoginError] = useState('');
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setLoginError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validation logic
    const errors: { [key: string]: string } = {};
    if (formData.username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (formData.password.trim() === '') {
      errors.password = 'Password is required';
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(prevFormErrors => ({ ...prevFormErrors, ...errors }));
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/login', formData);
        console.log(response.data);
        // Assuming successful login, navigate to '/home'
        window.location.href = '/home';
      } catch (error) {
        setLoginError('Invalid Login');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <div className="max-w-md w-full space-y- bg-opacity-75 p-8 rounded-lg">
        <div>
          <img className="mx-auto h-10 w-auto" src={logo} alt="Company Logo" />
        </div>
        <form className="mt- space-y-  " onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
         
          <div className="rounded-md shadow-sm  -space-y-px p-10">
            <div className='mb-5 relative'>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required className="appearance-none rounded-full relative block w-full pl-12 pr-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={formData.username} onChange={handleInputChange} />
              <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              {formErrors.username && <p className="text-red-500 mt-1">{formErrors.username}</p>}
            </div>
            <div className='relative'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-full relative block w-full pl-12 pr-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              {formErrors.password && <p className="text-red-500 mt-1">{formErrors.password}</p>}
              
            </div>
          </div>

          <div className='pl-11'>
            <button type="submit" className="group relative  flex justify-center py-4 px-30  border border-transparent text-md font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
            <div className='mr-10'>
            {loginError && <p className="text-white mt-9 m-20 text-center bg-red-500">{loginError}</p>}

            </div>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default LoginPage;
