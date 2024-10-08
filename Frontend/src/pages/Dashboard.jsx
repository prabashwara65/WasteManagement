import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 text-center font-bold text-xl">Dashboard</div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li className="p-3 hover:bg-blue-800 cursor-pointer transition-colors">
              <a href="#">Home</a>
            </li>
            <li className="p-3 hover:bg-blue-800 cursor-pointer transition-colors">
              <a href="#">Analytics</a>
            </li>
            <li className="p-3 hover:bg-blue-800 cursor-pointer transition-colors">
              <a href="#">Settings</a>
            </li>
            <li className="p-3 hover:bg-blue-800 cursor-pointer transition-colors">
              <a href="#">Profile</a>
            </li>
            <li className="p-3 hover:bg-blue-800 cursor-pointer transition-colors">
              <a href="#">Logout</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-8">
          <div className="font-bold text-xl text-gray-800">Dashboard</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <button className="focus:outline-none">
                <span className="text-gray-800">Notifications</span>
                <span className="ml-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">3</span>
              </button>
            </div>
            <div className="text-gray-800 cursor-pointer">Profile</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Cards */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-xl mb-2">Overview</h2>
              <p className="text-gray-600">Brief summary of dashboard statistics or insights.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-xl mb-2">Activity</h2>
              <p className="text-gray-600">Track recent activities and interactions.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-xl mb-2">Reports</h2>
              <p className="text-gray-600">View detailed analytics and reports.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
