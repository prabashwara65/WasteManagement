import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaChartArea } from "react-icons/fa";
import { IoPersonAddSharp, IoSettingsSharp, IoLogOutOutline } from "react-icons/io5";
import Overview from "./DashboardSideBar/DashboardOverview";
import Administration from "./DashboardSideBar/AdministrationPanel";
import Reports from "./DashboardSideBar/Reports";
import Settings from './DashboardSideBar/Settings';
import BinManagement from './DashboardSideBar/BinManagement';
import WasteManagement from './DashboardSideBar/WasteManagement';

function Dashboard() {
  const [activePage, setActivePage] = useState('overview');

  // This function dynamically renders the content based on the activePage
  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />;
      case 'accountAdmin':
        return <Administration />;
      case 'analytics':
        return <Reports />;
      case 'settings':
        return <Settings/>;
      case 'manage waste':
        return <WasteManagement/>;
      case 'manage bins':
        return <BinManagement/>;
      case 'profile':
        return <div>Profile Content</div>;
      case 'logout':
        return <div>Log Out Content</div>; // Replace with log out functionality if needed
      default:
        return <Overview />;
    }
  };

  // Sidebar link active class management
  const linkClass = (page) => 
    `flex items-center py-2 px-3 mt-3 cursor-pointer transition-colors duration-200 
     ${activePage === page ? 'bg-blue-800 text-white' : 'hover:bg-blue-700 text-gray-300'}`;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 text-center font-bold text-xl">Dashboard</div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li className={linkClass('overview')} onClick={() => setActivePage('overview')}>
              <MdDashboard className="mr-2" />
              <span>Overview</span>
            </li>
            <li className={linkClass('accountAdmin')} onClick={() => setActivePage('accountAdmin')}>
              <FaUsers className="mr-2" />
              <span>Account Administration</span>
            </li>
            <li className={linkClass('analytics')} onClick={() => setActivePage('analytics')}>
              <FaChartArea className="mr-2" />
              <span>Analytics</span>
            </li>
            <li className={linkClass('settings')} onClick={() => setActivePage('settings')}>
              <IoSettingsSharp className="mr-2" />
              <span>Settings</span>
            </li>
            <li className={linkClass('profile')} onClick={() => setActivePage('profile')}>
              <IoPersonAddSharp className="mr-2" />
              <span>Profile</span>
            </li>
            <li className={linkClass('manage waste')} onClick={() => setActivePage('manage waste')}>
              <IoPersonAddSharp className="mr-2" />
              <span>Manage Waste</span>
            </li>
            <li className={linkClass('manage bins')} onClick={() => setActivePage('manage bins')}>
              <IoPersonAddSharp className="mr-2" />
              <span>Manage Bins</span>
            </li>
            <li className={linkClass('logout')} onClick={() => setActivePage('logout')}>
              <IoLogOutOutline className="mr-2" />
              <span>Log Out</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-8 dark:bg-gray-800 dark:text-white">
          <div className="font-bold text-xl">Dashboard</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="relative">
              <button className="focus:outline-none">
                <span>Notifications</span>
                <span className="ml-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">3</span>
              </button>
            </div>
            <div className="cursor-pointer">Profile</div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1  bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto">
          <div style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
