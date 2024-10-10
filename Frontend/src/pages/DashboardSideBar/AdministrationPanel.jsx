import React, { useState } from 'react';
import { FaUserShield, FaUser } from 'react-icons/fa';

const AdministrationPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className="flex flex-col space-y-4 items-start ml-4 w-full relative">
      {/* Icons displayed based on selection */}
      <div className="flex justify-center mb-2 ml-28">
        {selectedOption === 'admin' && (
          <FaUserShield className="text-blue-600 text-4xl" />
        )}
        {selectedOption === 'user' && (
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
     <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
        <h2 className="text-lg font-bold mb-2">CRUD Table Container</h2>
        {/* Conditionally render the Admin CRUD Table */}
        {/* {selectedOption === 'admin' && <AdminCrudTable />} */}
        {selectedOption === 'admin' && <p className="text-gray-600">Admin table will be displayed here.</p>}
        {/* Placeholder for User CRUD Table or other content can be added here */}
        {selectedOption === 'user' && <p className="text-gray-600">User table will be displayed here.</p>}
      </div>
    </div>
  );
};

export default AdministrationPanel;
