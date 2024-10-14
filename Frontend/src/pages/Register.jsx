import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address_no: '',
    address_street: '',
    address_city: '',
    nic: '',
    phone: '',
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/register', values);
      if (res.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='shadow-lg px-8 py-5 border  bg-white rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-4 text-green-600'>Create an Account</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-medium'>Name</label>
            <input
              type='text'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              placeholder='Enter Username'
              name='username'
              onChange={handleChanges}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-medium'>Email</label>
            <input
              type='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
              placeholder='Enter Email'
              name='email'
              onChange={handleChanges}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 font-medium'>Password</label>
            <input
              type='password'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              placeholder='Enter Password'
              name='password'
              onChange={handleChanges}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='phone' className='block text-gray-700 font-medium'>Phone</label>
            <input
              type='tel'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              placeholder='Enter Phone Number'
              name='phone'
              onChange={handleChanges}
              required
            />
          </div>

          {/* Address Section */}
          <div className='col-span-1 md:col-span-2 flex flex-col'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Address</h3>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label htmlFor='address_no' className='block text-gray-700 font-medium'>Address No.</label>
                <input
                  type='text'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  placeholder='Enter Address No.'
                  name='address_no'
                  onChange={handleChanges}
                  required
                />
              </div>
              <div>
                <label htmlFor='address_street' className='block text-gray-700 font-medium'>Street</label>
                <input
                  type='text'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  placeholder='Enter Street'
                  name='address_street'
                  onChange={handleChanges}
                  required
                />
              </div>
              <div className='col-span-2'>
                <label htmlFor='address_city' className='block text-gray-700 font-medium'>City</label>
                <input
                  type='text'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  placeholder='Enter City'
                  name='address_city'
                  onChange={handleChanges}
                  required
                />
              </div>
              <div>
                <label htmlFor='nic' className='block text-gray-700 font-medium'>NIC</label>
                <input
                  type='text'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                  placeholder='Enter NIC'
                  name='nic'
                  onChange={handleChanges}
                  required
                />
              </div>
            </div>
          </div>

          <button className='w-full bg-green-600  text-white py-2 rounded-md hover:bg-green-700 transition duration-200'>Submit</button>
        </form>
        <div className='text-center mt-4'>
          <span>Already have an Account? </span>
          <Link to='/login' className='text-green-600 font-semibold underline'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
