import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function NavigationButton() {
  const navigate = useNavigate(); 

  const goToDashboard = () => {
    navigate('/Dashboard'); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={goToDashboard}
        className="relative px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-blue-500 hover:to-green-400"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 mr-2 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h4l3-7m0 0l3 7h8m-4 0v10a1 1 0 01-1 1H8a1 1 0 01-1-1V10m5 0h-5"
            />
          </svg>
          Go to Dashboard
        </span>
      </button>
    </div>
  );
}

export default NavigationButton;

