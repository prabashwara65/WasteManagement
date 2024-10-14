import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Topbar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo on the Left */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                    <img src="/path/to/logo.png" alt="App Logo" style={{ height: '30px', marginRight: '10px' }} />
                </Box>
                
                {/* App Name on the Right */}
                <Typography variant="h6" sx={{ marginRight: '16px' }}>
                    My Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
