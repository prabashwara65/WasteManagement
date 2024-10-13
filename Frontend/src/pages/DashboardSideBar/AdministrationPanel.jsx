import React, { useState } from 'react';
import { FaUserShield, FaUser } from 'react-icons/fa';
import AdminCrudTable from '../Admin/ViewAdmin'

const AdministrationPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className="flex flex-col space-y-4 items-start ml-4 w-100 h-screen relative">
      {/* Icons displayed based on selection */}
      <div className="flex justify-center mb-2 ml-28">
        {selectedOption === "admin" && (
          <FaUserShield className="text-blue-600 text-4xl" />
        )}
        {selectedOption === "user" && (
          <FaUser className="text-blue-600 text-4xl" />
        )}
      </div>

      <select
        id="admin-user-select"
        value={selectedOption}
        onChange={handleChange}
        className="w-64 bg-white border border-blue-600 font-semibold rounded-lg shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200 transition-colors"
      >
        <option value="admin">Admin </option>
        <option value="user">User </option>
      </select>

      {/* CRUD Table Container */}
      <div className="flex-1 bg-gray-100 p-2 rounded-lg shadow-md w-full mt-6">
        {/* Conditionally render the Admin CRUD Table */}
        {selectedOption === "admin" && (
          <div className="overflow-x-auto w-100">
            <AdminCrudTable />
          </div>
        )}
        {/* Placeholder for User CRUD Table or other content can be added here */}
        {selectedOption === "user" && (
          <p className="text-gray-600">User table will be displayed here.</p>
        )}
      </div>
    </div>
  );
};

export default AdministrationPanel;
