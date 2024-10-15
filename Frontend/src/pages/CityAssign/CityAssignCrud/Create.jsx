import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function createCityAssign() {
  const [colombo, setColombo] = useState('');
  const [kandy, setKandy] = useState('');
  const [galle, setGalle] = useState('');
  const [jaffna, setJaffna] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/cityassign/create', {
        colombo,
        kandy,
        galle,
        jaffna,
      })
      .then((res) => {
        console.log(res);
        navigate('/ViewCityAssign');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center font-bold text-blue-600">Make New City Assign</h2>

        <div className="mb-4">
          <label htmlFor="colombo" className="block text-gray-700 mb-2">Colombo</label>
          <input
            type="text"
            id="colombo"
            name="colombo"
            value={colombo}
            onChange={(e) => setColombo(e.target.value)}
            placeholder="Enter name"
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="kandy" className="block text-gray-700 mb-2">Kandy</label>
          <input
            type="text"
            id="kandy"
            name="kandy"
            value={kandy}
            onChange={(e) => setKandy(e.target.value)}
            placeholder="Enter email"
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="galle" className="block text-gray-700 mb-2">Galle</label>
          <input
            type="text"
            id="galle"
            name="galle"
            value={galle}
            onChange={(e) => setGalle(e.target.value)}
            placeholder="Enter city"
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jaffna" className="block text-gray-700 mb-2">Jaffna</label>
          <input
            type="text"
            id="jaffna"
            name="jaffna"
            value={jaffna}
            onChange={(e) => setJaffna(e.target.value)}
            placeholder="Enter address"
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>


        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full">
          Add City Design
        </button>
      </form>
    </div>
  );
}

export default createCityAssign;
