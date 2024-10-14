import React, { useEffect, useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';

import Profile from './Profile';
import SchedulePickup from './SchedulePickup';

const GeneralUserDashboard = () => {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const userName = "John Doe"; // Replace this with actual logged-in user data
  const [wasteCollections, setWasteCollections] = useState([]);

  // Sample data for waste collections
  // const wasteCollections = [
  //   { id: 1, wasteType: 'Food Waste', binId: 'BIN001', date: 'Oct 1, 2024', time: '10:00 AM' },
  //   { id: 2, wasteType: 'Polythene', binId: 'BIN002', date: 'Oct 2, 2024', time: '11:30 AM' },
  //   { id: 3, wasteType: 'Paper', binId: 'BIN003', date: 'Oct 3, 2024', time: '09:15 AM' },
  //   { id: 1, wasteType: 'Food Waste', binId: 'BIN001', date: 'Oct 1, 2024', time: '10:00 AM' },
  //   { id: 2, wasteType: 'Polythene', binId: 'BIN002', date: 'Oct 2, 2024', time: '11:30 AM' },
  //   { id: 3, wasteType: 'Paper', binId: 'BIN003', date: 'Oct 3, 2024', time: '09:15 AM' },
  //   { id: 1, wasteType: 'Food Waste', binId: 'BIN001', date: 'Oct 1, 2024', time: '10:00 AM' },
  //   { id: 2, wasteType: 'Polythene', binId: 'BIN002', date: 'Oct 2, 2024', time: '11:30 AM' },
  //   { id: 3, wasteType: 'Paper', binId: 'BIN003', date: 'Oct 3, 2024', time: '09:15 AM' },
  //   { id: 1, wasteType: 'Food Waste', binId: 'BIN001', date: 'Oct 1, 2024', time: '10:00 AM' },
  //   { id: 2, wasteType: 'Polythene', binId: 'BIN002', date: 'Oct 2, 2024', time: '11:30 AM' },
  //   { id: 3, wasteType: 'Paper', binId: 'BIN003', date: 'Oct 3, 2024', time: '09:15 AM' },
  //   // Add more records as needed
  // ];

  // Fetch waste collection records
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/genUserRoute/collections/2'); // Replace with actual user ID
        setWasteCollections(response.data);
        
      } catch (error) {
        console.error('Error fetching waste collection records:', error);
        
      };
    };
    fetchCollections();

  }, []);

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
          <Typography variant="h5" sx={{ fontWeight: 'bold', opacity: 0.7 }}>
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
                  marginLeft: 2,
                  textAlign: 'left',
                  opacity: 0.7
                }}
              >
                Waste Generation
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}>
                {/* Cards for Dashboard content */}
                <Card sx={{ backgroundColor: '#E1FCDB', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1, marginRight: '10px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'center' }}>
                      Food Waste
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 20 kg</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ backgroundColor: '#FBDCDC', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1, marginRight: '10px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'center' }}>
                      Polythene
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 15 kg</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ backgroundColor: '#CFE6F9', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'center' }}>
                      Paper
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Weight: 25 kg</Typography>
                  </CardContent>
                </Card>
              </div>

              {/* New Cards Below */}
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
                          Due Payment
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#30A37A' }}>
                          LKR 5000
                        </Typography>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#30A37A', color: 'white', borderRadius: '8px', width: '150px' }}>
                          Make Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', padding: '20px' }}>
                      <Typography variant="h6" sx={{ fontWeight: '600', color: 'black' }}>
                        Total Collection
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#30A37A' }}>
                        10 Collections
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Waste Collection Records Table */}
              <Typography
                variant="h6"
                sx={{
                  marginTop: '20px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  textAlign: 'left',
                  marginLeft: 2
                }}
              >
                Waste Collection Records
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto'}}>
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: '#BAFFD9' }}>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Waste Type</strong></TableCell>
                      <TableCell><strong>Bin ID</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Time</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wasteCollections.map((row, index) => (
                      <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#ECFFDD' }}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.binId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
