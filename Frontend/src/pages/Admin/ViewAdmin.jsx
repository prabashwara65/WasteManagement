import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAdmin() {
    const [admin , setAdmin] = useState([])

 useEffect(() => {
    axios.get('http://localhost:3000/admins/admin')
    .then(res => setAdmin(res.data))
    .catch(err => console.log(err))
 }, [])

  return (
    <div className="flex h-screen bg-blue-800 justify-center items-center">
      <div className="w-3/4 bg-white rounded-lg p-3">
        <Link
          to="/createAdmin"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 m-5">
          Add New Admin
        </Link>
        <table className="mt-10 able-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3">ADMIN ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Registered Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((data, i) => (
              <tr key={i}>
                <td className="px-6 py-3">{data.id}</td>
                <td className="px-6 py-3">{data.username}</td>
                <td className="px-6 py-3">{data.email}</td>
                <td className="px-6 py-3">{data.department}</td>
                <td className="px-6 py-3">{data.created_at}</td>
                <td>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAdmin
