import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateAdmin() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the admin details on component mount
  useEffect(() => {
    axios.get(`http://localhost:3000/admins/admin/${id}`) // API to fetch admin details by ID
      .then((res) => {
        setName(res.data.username);   // Set state with the fetched data
        setEmail(res.data.email);
        setDepartment(res.data.department);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/admins/update/${id}`, { username, email, department })
      .then(res => {
        console.log(res);
        navigate('/viewAdmin');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex h-screen bg-blue-700 justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-center font-bold">Edit Admin Information</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 mb-2">Department</label>
          <select
            id="department"
            name="department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required>
            <option value="">Select Department</option>
            <option value="recycling">Recycling</option>
            <option value="waste collection">Waste Collection</option>
            <option value="hazardous waste">Hazardous Waste Management</option>
            <option value="composting">Composting</option>
            <option value="landfill management">Landfill Management</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateAdmin;
