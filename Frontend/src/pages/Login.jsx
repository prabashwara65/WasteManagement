import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../ReduxTool/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); // Fixed this line
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', values);
      console.log(res.data);

      if (res.status === 201) {
        const user = res.data;
        console.log(user);
        dispatch(setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          address_no: user.address_no,
          address_street: user.address_street,
          address_city: user.address_city,
          nic: user.nic,
          phone: user.phone,
        }));

        // Navigate based on role
        if (res.data.role === 'admin') {
          navigate('/Dashboard');
          return; // Prevent navigating again to '/' after this
        } else if (res.data.role === 'collector') {
          navigate('/collectorDashboard');
          return; // Prevent navigating again to '/' after this
        }else if (res.data.role === 'user') {
          navigate('/userDashboard');
          return; // Prevent navigating again to '/' after this
        }

        // Default navigation (e.g., for regular users)
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-lg font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input
              type='email'
              className='w-full px-3 py-2 border'
              placeholder='Enter Email'
              name='email'
              onChange={handleChanges}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input
              type='password'
              className='w-full px-3 py-2 border'
              placeholder='Enter Password'
              name='password'
              onChange={handleChanges}
            />
          </div>
          <button className='w-full bg-green-600 text-white py-2'>Submit</button>
        </form>
        <div className='text-center'>
          <span>Don't have an Account? </span>
          <Link to='/register' className='text-red-500 underline'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
