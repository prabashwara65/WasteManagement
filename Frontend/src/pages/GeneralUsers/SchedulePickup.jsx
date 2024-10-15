import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const SchedulePickup = ({ id = userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    wasteType: '',
    date: null,
    time: null,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if time and date are valid
    if (!formData.date || !formData.time) {
      setSnackbar({ open: true, message: 'Please select both date and time.', severity: 'error' });
      return;
    }

    const pickupData = {
      user_id: id,
      name: formData.name,
      wasteType: formData.wasteType,
      date: formData.date.toISOString().split('T')[0],
      time: formData.time.toISOString().split('T')[1].split('.')[0],
    };

    console.log('Pickup Data:', pickupData); // Debug log

    try {
      const response = await axios.post('http://localhost:3000/genUserRoute/schedulePickup', pickupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Pickup scheduled:', response.data);
      setFormData({ name: '', wasteType: '', date: null, time: null });
      setSnackbar({ open: true, message: 'Pickup scheduled successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error scheduling pickup:', error.response ? error.response.data : error.message);
      setSnackbar({ open: true, message: 'Error scheduling pickup: ' + (error.response ? error.response.data : error.message), severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Waste Type</InputLabel>
            <Select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="polythene">Polythene</MenuItem>
              <MenuItem value="paper">Paper</MenuItem>
              <MenuItem value="e-waste">E-waste</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <DatePicker
                label="Select Date"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              <TimePicker
                label="Select Time"
                value={formData.time}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
          </LocalizationProvider>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#259E73',
              '&:hover': {
                backgroundColor: '#1e7a5d',
              },
              marginTop: 2,
              padding: '10px 20px',
            }}
            type="submit"
          >
            Schedule Pickup
          </Button>
        </form>
      </CardContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SchedulePickup;
