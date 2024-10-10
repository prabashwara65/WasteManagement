import React, { useState } from 'react';
import { FaUserShield, FaUser } from 'react-icons/fa'; // Importing icons

const AdministrationPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // Update state without navigation
  };

  return (
    <div className="flex flex-col space-y-4 items-start ml-4"> {/* Align to left with margin */}
      {/* Icons displayed based on selection */}
      <div className="flex justify-center mb-2 ml-28">
        {selectedOption === '/admin' && (
          <FaUserShield className="text-blue-600 text-4xl" />
        )}
        {selectedOption === '/user' && (
          <FaUser className="text-blue-600 text-4xl" />
        )}
      </div>

      <select
        id="admin-user-select"
        value={selectedOption}
        onChange={handleChange} // Update selected option
        className="w-64 bg-white border border-blue-600 font-semibold rounded-lg shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-200 transition-colors"
      >
        <option value="">Select an option</option>
        <option value="/admin">Admin Details</option>
        <option value="/user">User Details</option>
      </select>
    </div>
  );
};

export default AdministrationPanel;
