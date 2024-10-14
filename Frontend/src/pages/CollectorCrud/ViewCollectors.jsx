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
    <div className="flex h-screen bg-blue-300 justify-center items-center">
      <div className="w-3/4 bg-white rounded-lg p-3">
        <Link
          to="/CreateCollectors"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 m-5"
        >
          Add New Collector
        </Link>
        <div className="mt-2 max-h-96 overflow-y-auto">
          <table className="mt-10 w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3">Collector ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {collectors.map((collector) => (
                <tr key={collector.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{collector.id}</td>
                  <td className="px-6 py-3">{collector.name}</td>
                  <td className="px-6 py-3">{collector.email}</td>
                  <td className="px-6 py-3">{collector.city}</td>
                  <td className="px-6 py-3">{collector.address}</td>
                  <td className="px-6 py-3">{collector.phone}</td>
                  <td className="px-6 py-3">{collector.salary}</td>
                  <td>
                    {/* Use flex to align buttons in a row */}
                    <div className="flex space-x-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleEdit(collector.id)} // Navigate to edit page
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
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
