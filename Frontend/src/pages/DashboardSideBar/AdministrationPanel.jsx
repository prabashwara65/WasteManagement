import React from 'react';

const AdminUserButtons = () => {
  return (
    <div className="flex justify-around mt-6">
      {/* Admin Button */}
      <a
        href="/admin"
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
      >
        <img 
          src="path/to/admin-image.jpg"  // Replace with your Admin image path
          alt="Admin"
          className="w-16 h-16 object-cover mb-2"
        />
        <span className="font-bold text-gray-800">Admin</span>
      </a>

      {/* User Button */}
      <a
        href="/user"
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
      >
        <img 
          src="path/to/user-image.jpg"  // Replace with your User image path
          alt="User"
          className="w-16 h-16 object-cover mb-2"
        />
        <span className="font-bold text-gray-800">User</span>
      </a>
    </div>
  );
};

export default AdminUserButtons;
