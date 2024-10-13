import React, { useState } from 'react';
import Report3 from '../Reports/PredictiveReports'

function Reports() {
  const [activeSection, setActiveSection] = useState('report1');

  // Function to render the content based on the active report section
  const renderContent = () => {
    switch (activeSection) {
      case 'report1':
        return <div className="p-4">Content for Report 1</div>;
      case 'report2':
        return <div className="p-4">Content for Report 2</div>;
      case 'report3':
        return <Report3 />
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-200">
      <h1 className="text-3xl font-bold mt-8 mb-8">Reports Dashboard</h1>

      {/* Creative Buttons */}
      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => setActiveSection("report1")}
          className={`relative px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 
         ${activeSection === "report1"  ? "bg-gradient-to-r from-green-500 to-blue-600 text-white": "bg-gradient-to-r from-gray-500 to-gray-600 text-white" }`}>
            User Distribution & Area Metrics Report
        </button>
        <button
          onClick={() => setActiveSection("report2")}
          className={`relative px-10 py-4 rounded-full shadow-lg text-white transition-all duration-300 transform hover:scale-105 
            ${
              activeSection === "report2"
                ? "bg-gradient-to-r from-purple-500 to-pink-600"
                : "bg-gradient-to-r from-gray-500 to-gray-600"
            }`}
        >
          Zone-Based Garbage Collection Report
        </button>
        <button
          onClick={() => setActiveSection("report3")}
          className={`relative px-10 py-4 rounded-full shadow-lg text-white transition-all duration-300 transform hover:scale-105 
            ${
              activeSection === "report3"
                ? "bg-gradient-to-r from-red-500 to-yellow-600"
                : "bg-gradient-to-r from-gray-500 to-gray-600"
            }`}
        >
          Predictive Waste Generation and Collection Report
        </button>
      </div>

      {/* Displaying the content of the selected report */}
      <div className="w-4/5 bg-white p-10 rounded-lg shadow-lg mb-5">
        {renderContent()}
      </div>
    </div>
  );
}

export default Reports;
