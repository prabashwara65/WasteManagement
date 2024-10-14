// SchedulePickup.jsx
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const SchedulePickup = () => {
  const [formData, setFormData] = useState({
    name: '',
    wasteType: '',
    date: null,
    time: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission
    console.log('Schedule Pickup:', formData);
  };

  return (
    <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Schedule Pickup</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>Select a date and time for your pickup.</Typography>

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
              <MenuItem value="organic">Organic</MenuItem>
              <MenuItem value="plastic">Plastic</MenuItem>
              <MenuItem value="paper">Paper</MenuItem>
              <MenuItem value="metal">Metal</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} sx={{ marginBottom: 2 }} />}
            />
            <TimePicker
              label="Select Time"
              value={formData.time}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField fullWidth {...params} sx={{ marginBottom: 2 }} />}
            />
          </LocalizationProvider>

          <Button variant="contained" color="primary" type="submit">
            Schedule Pickup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchedulePickup;
