import React, { useState } from 'react';
import { Box } from '@mui/material';
import DrawerMenu from '../collector/components/DrawerMenu';
import HorizontalBar from '../collector/components/HorizontalBar';
import Topbar from '../collector/components/Topbar';
import Scanner from './CollectorScanner'; // Assuming you have this component
import CollectorProfile from './CollectorProfile'; // Assuming you have this component
import { useSelector, useDispatch } from 'react-redux';

const CollectorDashboard = () => {
    const [selectedItem, setSelectedItem] = useState('Profile');
    const [userName, setUserName] = useState('John Doe'); // Replace with actual user name
    const user = useSelector((state) => state.user);

    // Define the menu items for the drawer
    const menuItems = [
        {
            name: 'Profile',
            icon: <span>👤</span>, // Replace with your icon component
            onClick: () => handleMenuClick('Profile'),
        },
        {
            name: 'Scan',
            icon: <span>🔍</span>, // Replace with your icon component
            onClick: () => handleMenuClick('Scan'),
        },
        // Add more menu items as needed
    ];

    const handleMenuClick = (itemName) => {
        setSelectedItem(itemName);
        // Additional logic can be added here if needed
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>

            <Topbar/>
            {/* Left Drawer Menu */}
            <DrawerMenu
                selectedItem={selectedItem}
                menuItems={menuItems}
                onItemClick={handleMenuClick}
            />

            <Box sx={{ flexGrow: 1}}>
                {/* Top Bar */}
                <HorizontalBar title="Dashboard" userName={userName} />

                {/* Content Section */}
                <Box sx={{ padding: '20px' }}>
                    {selectedItem === 'Profile' && <CollectorProfile />}
                    {selectedItem === 'Scan' && <Scanner/>} {/* Placeholder for scan component */}
                    {/* You can render different components based on selected item here */}
                </Box>
            </Box>
        </Box>
    );
};

export default CollectorDashboard;
