import React from 'react';

const DashboardCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
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
  );
};

export default DashboardCards;
