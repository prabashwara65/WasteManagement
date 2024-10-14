import React, { useState } from 'react';
import { FaUserShield, FaUser } from 'react-icons/fa';
import AdminCrudTable from '../Admin/ViewAdmin';
import UserCrudTable from '../Admin/UsersAdminView/ViewUser';

const AdministrationPanel = () => {
  const [activeSection, setActiveSection] = useState('admin'); // Default to 'admin'

  const renderContent = () => {
    switch (activeSection) {
      case 'admin':
        return <AdminCrudTable />;
      case 'user':
        return <UserCrudTable />
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mt-8 mb-8">Administration Panel</h1>

      {/* Buttons for Admin and User views */}
      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => setActiveSection("admin")}
          className={`relative px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 
            ${
              activeSection === "admin"
                ? "bg-gradient-to-r from-green-500 to-blue-600 text-white"
                : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
            }`}
        >
          <FaUserShield className="inline-block mr-2 text-xl" />
          Admin Dashboard
        </button>
        <button
          onClick={() => setActiveSection("user")}
          className={`relative px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 
            ${
              activeSection === "user"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
            }`}
        >
          <FaUser className="inline-block mr-2 text-xl" />
          User Dashboard
        </button>
      </div>

      {/* Displaying the content based on selected option */}
      <div className=" bg-white  rounded-lg shadow-lg mb-5 " style={{ width: '90%' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdministrationPanel;
