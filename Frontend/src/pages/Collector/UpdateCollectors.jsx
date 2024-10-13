import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCollectors() {
  const [name, setName] = useState('')
  const [email , setEmail] = useState('')
  const [area, setArea] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the admin details on component mount
  useEffect(() => {
    axios.get(`http://localhost:3000/collectors/collector/${id}`) // API to fetch admin details by ID
      .then((res) => {
        setName(res.data.name);   // Set state with the fetched data
        setEmail(res.data.email);
        setDepartment(res.data.area);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/collectors/update/${id}`, { name, email, area })
      .then(res => {
        console.log(res);
        navigate('/ViewCollectors');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex h-screen bg-blue-700 justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-center font-bold">Edit Collectors Information</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
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
          <label htmlFor="area" className="block text-gray-700 mb-2">Area</label>
          <select
            id="area"
            name="area"
            value={area}
            onChange={e => setArea(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required>
            <option value="">Select Assigned Area</option>
            <option value="Area1">Area 1</option>
            <option value="Area2">Area 2</option>
            <option value="Area3">Area 3</option>
            <option value="Area4">Area 4</option>
          </select>
        </div>
        

        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateCollectors;