import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ViewCityAssigns() {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cities data
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cityassign/ViewCityAssigns');
        setCities(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities();
  }, []);

  const handleEdit = (id) => {
    navigate(`/UpdateCityAssign/${id}`); // Navigate to UpdateCityAssign page
  };

  return (
    <div className="flex h-screen bg-blue-300 justify-center items-center">
      <div className="w-3/4 bg-white rounded-lg shadow-lg p-5">
        <h2 className="text-2xl font-semibold text-center mb-5">City Assignments</h2>
        <div className="overflow-y-auto">
          <table className="mt-5 w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="px-6 py-3 text-left">Colombo</th>
                <th className="px-6 py-3 text-left">Kandy</th>
                <th className="px-6 py-3 text-left">Galle</th>
                <th className="px-6 py-3 text-left">Jaffna</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => {
                return (
                  <tr key={city.id} className="border-b hover:bg-gray-50 transition duration-300">
                    <td className="px-6 py-4">{city.Colombo || 'N/A'}</td>
                    <td className="px-6 py-4">{city.Kandy || 'N/A'}</td>
                    <td className="px-6 py-4">{city.Galle || 'N/A'}</td>
                    <td className="px-6 py-4">{city.Jaffna || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded"
                          onClick={() => handleEdit(city.id)} // Navigate to edit page
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCityAssigns;
