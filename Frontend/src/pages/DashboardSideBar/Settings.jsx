import React from 'react';

function Settings() {
  return (
    <div className="container mx-auto p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Username</label>
            <input
              type="text"
              className="p-2 bg-gray-100 border border-gray-300 rounded-md w-1/2"
              defaultValue="johndoe"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              className="p-2 bg-gray-100 border border-gray-300 rounded-md w-1/2"
              defaultValue="johndoe@example.com"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Phone</label>
            <input
              type="text"
              className="p-2 bg-gray-100 border border-gray-300 rounded-md w-1/2"
              defaultValue="+1234567890"
            />
          </div>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Email Notifications</label>
            <input type="checkbox" className="w-6 h-6" defaultChecked />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-gray-700">SMS Notifications</label>
            <input type="checkbox" className="w-6 h-6" />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Push Notifications</label>
            <input type="checkbox" className="w-6 h-6" defaultChecked />
          </div>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Update Preferences
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Change Password</label>
            <input
              type="password"
              className="p-2 bg-gray-100 border border-gray-300 rounded-md w-1/2"
              placeholder="New password"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="p-2 bg-gray-100 border border-gray-300 rounded-md w-1/2"
              placeholder="Confirm password"
            />
          </div>
          <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
