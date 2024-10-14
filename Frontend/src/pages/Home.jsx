import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user);
  const cityAssign = useSelector((state) => state.city);
  console.log(cityAssign)
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 shadow-lg p-5">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">WasteManagement</div>
          <ul className="flex space-x-6 text-white">
            <li><a href="#" className="hover:text-blue-200">Home</a></li>
            <li><a href="#" className="hover:text-blue-200">About</a></li>
            <li><a href="#" className="hover:text-blue-200">Services</a></li>
            <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            <li><a href="#" className="hover:text-blue-200"><h1>Name - {user.name}</h1></a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Waste Management System</h1>
          <p className="text-xl mb-6">We provide the best services for you</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-200 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Middle Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature One</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature Two</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature Three</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">&copy; 2024 MyWebsite. All rights reserved.</p>
          <ul className="flex justify-center space-x-4">
            <li><a href="#" className="hover:text-blue-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-200">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Home
