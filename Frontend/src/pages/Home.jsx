import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const Home = () => {
  const user = useSelector((state) => state.user);
  const cityAssign = useSelector((state) => state.city.cityAssign);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUserNameClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to get city value based on user address city
  const getCityValue = () => {
    let cityValue = '';

    // Retrieve city value based on the user's address city
    if (user.address_city === 'Colombo') {
      cityValue = cityAssign.Colombo || ''; // Ensure it's a string
    } else if (user.address_city === 'Kandy') {
      cityValue = cityAssign.Kandy || '';
    } else if (user.address_city === 'Galle') {
      cityValue = cityAssign.Galle || '';
    } else if (user.address_city === 'Jaffna') {
      cityValue = cityAssign.Jaffna || '';
    } else {
      return { message: 'No values found for your city.' };
    }

    // Check if cityValue is a string
    if (typeof cityValue !== 'string' || cityValue.trim() === '') {
      return { message: 'City value is not in the expected format.' };
    }

    return cityValue; // Return the city value
  };

  // Get the city value
  const cityValue = getCityValue();
  const isFlatFee = cityValue.startsWith('FF');
  const isWeightBased = cityValue.startsWith('WB');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 shadow-lg p-5">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">WasteManagement</div>
          <ul className="flex space-x-6 text-white">
            <li><a href="#" className="hover:text-blue-200">Home</a></li>
            <li><a href="#" className="hover:text-blue-200">About</a></li>
            <li><a href="#" className="hover:text-blue-200">Services</a></li>
            <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            <li>
              <h1 onClick={handleUserNameClick} className="hover:text-blue-200 cursor-pointer">
                Name - {user.name}
              </h1>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Waste Management System</h1>
          <p className="text-xl mb-6">We provide the best services for you</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-200 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Middle Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature One</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature Two</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Feature Three</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet velit non mi aliquam venenatis.</p>
          </div>
        </div>
      </section>

      {/* User Address Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{
        className: "rounded-lg shadow-xl border border-gray-300", // Add custom styles
      }}>
        <DialogTitle className="bg-blue-500 text-white text-lg font-bold text-center w-96">{user.name}</DialogTitle>
        <DialogContent className="bg-white p-6">
          <Typography variant="body1" className="text-gray-800 mb-4">
            Your City: <span className="font-semibold">{user.address_city || 'N/A'}</span>
          </Typography>
          <div className="flex gap-20">
          <Typography variant="h6" className="text-blue-600 mb-2 ">Payment Revenue:</Typography>
          {cityValue ? (
            <div>
              {isFlatFee && (
                <Typography variant="body2" className="text-green-600 mt-4">
                  Price: LKR {cityValue.replace('FF-', '')}
                </Typography>
              )}
              {isWeightBased && (
                <Typography variant="body2" className="text-blue-600 mt-2">
                  Per 1 Kg<br/>{cityValue.replace('WB-', '')}
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1" className="text-red-500">{cityValue.message}</Typography>
          )}
          </div>
        </DialogContent>
        <DialogActions className="bg-gray-100">
          <Button onClick={handleCloseDialog} color="primary" className="hover:bg-blue-600 text-white">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Waste Management. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

