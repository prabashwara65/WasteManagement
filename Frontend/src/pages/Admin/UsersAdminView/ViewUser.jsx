import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ViewAdmin() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // To control modal visibility
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user data
    const [formData, setFormData] = useState({
        username: '', 
        email: '', 
        address_no: '', 
        address_street: '', 
        address_city: '',
        phone: '',
        nic: ''
    }); // To handle form data

    useEffect(() => {
        axios.get('http://localhost:3000/users/user')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/users/delete/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user); 
        setFormData({ 
            username: user.username, 
            email: user.email, 
            address_no: user.address_no,
            address_street: user.address_street,
            address_city: user.address_city,
            phone: user.phone,
            nic: user.nic
        }); 
        setShowModal(true); 
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/update/${selectedUser.id}`, formData);
            setShowModal(false); 
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <div className="flex h-screen bg-green-200 justify-center items-center">
        <div className="bg-white rounded-lg p-3" style={{ width: "90%" }}>
          <div className="mt-2 max-h-96 overflow-y-auto">
            <table className="mt-10 w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-5 py-3">User ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Address</th>
                  <th className="px-5 py-3">NIC</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3">{user.id}</td>
                    <td className="px-5 py-3">{user.username}</td>
                    <td className="px-5 py-3">{user.email}</td>
                    <td className="px-5 py-3">
                      {user.address_no} <br />
                      {user.address_street} <br />
                      {user.address_city}
                    </td>
                    <td className="px-5 py-3">{user.nic}</td>
                    <td className="px-5 py-3">{user.phone}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                          onClick={() => handleDelete(user.id)}
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Update User</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address No
                  </label>
                  <input
                    type="text"
                    name="address_no"
                    value={formData.address_no}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Street
                  </label>
                  <input
                    type="text"
                    name="address_street"
                    value={formData.address_street}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="address_city"
                    value={formData.address_city}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    NIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}

export default ViewAdmin;
