import React from 'react'

const Register = () => {
  return (
    //flex - display as flex
    //justify-center - make them horizontally center 
    //items-center - make them vertically center
    //h-screen - take screen height

    //background container
    <div className='flex justify-center items-center h-screen'>

        {/* main container */}
        <div className='shadow-lg px-8 py-5 border w-96'> 
          <h2 className='text-lg font-bold mb-4'>Register</h2>
          <form>
            <div className='mb-4'>
              <label htmlFor='username' className='block text-gray-700'>UserName</label>
              {/* w-fll - take the same width as main container */}
              <input type='text' className="w-full px-3 py-2 border" placeholder='Enter Username'/>
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700'>Email</label>
              <input type='email' className='w-full px-3 py-2 border' placeholder='Enter Email'/>
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700'>Password</label>
              <input type='password' className="w-full px-3 py-2 border" placeholder='Enter Password'/>
            </div>
            <button className='w-full bg-green-600 text-white py-2' >Submit</button>
          </form>
          <div className='text-center'>
            <span>Alrady have Account</span>
            <a href='/login'>Login</a>
          </div>
        </div>
      
    </div>
  )
}

export default Register
