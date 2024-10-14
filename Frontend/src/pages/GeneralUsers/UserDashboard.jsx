// GeneralUserDashboard.jsx
import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon, Card, CardContent, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Import the new components
import Profile from './Profile';
import SchedulePickup from './SchedulePickup';

const GeneralUserDashboard = () => {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard'); // Set default screen to Dashboard
  const userName = "John Doe"; // Replace this with actual logged-in user data

  const handleDrawerSelection = (screen) => {
    setSelectedScreen(screen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: { width: 240, backgroundColor: '#259E73', paddingTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        }}
      >
        <div>
          <Typography variant="h6" sx={{ padding: '16px', color: 'white', fontWeight: 'bold' }}>Menu</Typography>
          <List>
            <ListItem button onClick={() => handleDrawerSelection('Dashboard')} sx={{ marginBottom: '10px', color: 'white' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button onClick={() => handleDrawerSelection('Profile')} sx={{ marginBottom: '10px', color: 'white' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button onClick={() => handleDrawerSelection('Schedule Pickup')} sx={{ marginBottom: '10px', color: 'white' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Schedule Pickup" sx={{ fontWeight: 'bold' }} />
            </ListItem>
          </List>
        </div>

        <div style={{ width: '100%' }}>
          <ListItem button sx={{ position: 'absolute', bottom: 0, width: '100%', color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ fontWeight: 'bold' }} />
          </ListItem>
        </div>
      </Drawer>

      <div style={{ flexGrow: 1, marginLeft: 240 }}>
        <AppBar position="static" sx={{ backgroundColor: '#BAFFD9' }}>
          <Toolbar sx={{ paddingLeft: '10px' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <img src="/path/to/logo.png" alt="Company Logo" style={{ height: 40, marginRight: 10 }} />
              Company Name
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f4f4f4' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              opacity: 0.7 // Set opacity to 70%
            }}>
            {selectedScreen}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>Welcome, {userName}</Typography>
        </div>

        <div style={{ padding: 20 }}>
          {selectedScreen === 'Dashboard' && (
            <>
              {/* Waste Generation Heading */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem', 
                  marginBottom: '16px', 
                  marginLeft: 2, // Adjust margin to align heading
                  textAlign: 'left',
                  opacity: 0.7 // Set opacity to 70%
                }}>
                Waste Generation
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}> {/* Adjusted margin for the container */}
                {/* Cards for Dashboard content */}
                <Card sx={{ backgroundColor: '#E1FCDB', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1, marginRight: '10px' }}> {/* Flex for equal distribution */}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Food Waste
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 20 kg</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ backgroundColor: '#FBDCDC', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1, marginRight: '10px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Polythene
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 15 kg</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ backgroundColor: '#CFE6F9', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Paper
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 25 kg</Typography>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {selectedScreen === 'Profile' && <Profile />}
          {selectedScreen === 'Schedule Pickup' && <SchedulePickup />}
        </div>
      </div>
    </div>
  );
};

export default GeneralUserDashboard;
