import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal';  

function ViewAdmin() {
  const [admin, setAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    department: '',
  });

  // Fetch the admins list
  useEffect(() => {
    axios.get('http://localhost:3000/admins/admin')
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err));
  }, []);

  // Open the modal and set the selected admin for editing
  const openModal = (adminData) => {
    setSelectedAdmin(adminData);
    setFormData({
      username: adminData.username,
      email: adminData.email,
      department: adminData.department,
    });
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission for updating the admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/admins/update/${selectedAdmin.id}`, formData);
      setIsModalOpen(false);  // Close modal after successful update
      window.location.reload(); // Reload the page to show the updated data
    } catch (error) {
      console.log('Error updating admin:', error);
    }
  };

  // Handle delete admin
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admins/delete/${id}`);
      window.location.reload();  // Reload the page to update the list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen bg-blue-300 justify-center items-center">
      <div className=" bg-white rounded-lg p-3" style={{ width: '90%' }}>
        <Link
          to="/createAdmin"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 m-5"
        >
          Add New Admin
        </Link>
        <div className="mt-2 max-h-96 overflow-y-auto">
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
                    {/* Use flex to align buttons in a row */}
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => openModal(data)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleDelete(data.id)}
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

      {/* Modal for editing admin */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 mb-2">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
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
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update
            </button>
            <button type="button" onClick={closeModal} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ViewAdmin;
