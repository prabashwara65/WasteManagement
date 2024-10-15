import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ViewCollectors() {
  const [collectors, setCollectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/collectors/collector')
      .then((res) => setCollectors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/collectors/delete/${id}`);
      setCollectors(collectors.filter(collector => collector.id !== id)); // Update the state after deletion
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/UpdateCollector/${id}`); // Programmatic navigation to UpdateCollector page
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFFBF7]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Collectors List</h2>
          <Link
            to="/CreateCollectors"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            + Add New Collector
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-inner">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">ID</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Name</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Email</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">City</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Address</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Phone</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Salary</th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {collectors.map((collector) => (
                <tr key={collector.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-gray-800">{collector.id}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.name}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.email}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.city}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.address}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.phone}</td>
                  <td className="px-6 py-4 text-gray-800">{collector.salary}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
                        onClick={() => handleEdit(collector.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => handleDelete(collector.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCollectors;
