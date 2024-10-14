import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCityAssign = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [colombo, setColombo] = useState('');
  const [kandy, setKandy] = useState('');
  const [galle, setGalle] = useState('');
  const [jaffna, setJaffna] = useState('');
  const navigate = useNavigate();

  // Fetch the city assignment data when the component mounts
  useEffect(() => {
    const fetchCityAssign = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cityassign/${id}`);
        const cityAssign = response.data;
        setColombo(cityAssign.colombo);
        setKandy(cityAssign.kandy);
        setGalle(cityAssign.galle);
        setJaffna(cityAssign.jaffna);
      } catch (error) {
        console.error('Error fetching city assignment:', error);
      }
    };

    fetchCityAssign();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/cityassign/update/${id}`, {
        colombo,
        kandy,
        galle,
        jaffna,
      })
      .then((res) => {
        console.log(res);
        navigate('/ViewCityAssign'); // Navigate back to the view after updating
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center font-bold text-blue-600">Update City Assign</h2>

        <div className="mb-4">
          <label htmlFor="colombo" className="block text-gray-700 mb-2">Colombo</label>
          <input
            type="text"
            id="colombo"
            name="colombo"
            value={colombo}
            onChange={(e) => setColombo(e.target.value)}
            placeholder="Enter Colombo"
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
            placeholder="Enter Kandy"
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
            placeholder="Enter Galle"
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
            placeholder="Enter Jaffna"
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full">
          Update City Assign
        </button>
      </form>
    </div>
  );
};

export default UpdateCityAssign;
